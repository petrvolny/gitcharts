#!/usr/bin/perl
use strict;
use warnings;
use POSIX qw(strftime);
use JSON::XS;
use Getopt::Long qw/:config no_ignore_case/;

my $opts;
GetOptions(
	'p=s'      => sub { $opts->{'p'}        = $_[1] },
	'r=s'      => sub { $opts->{'r'}        = $_[1] },
	'd=s'      => sub { $opts->{'d'}        = $_[1] },
	'help'      => sub { print "perldoc $0\n"; exit },
) or die("Error in command line arguments\n");
die "Project must be specified" if $opts->{r} and not $opts->{p};
my $days = $opts->{d} || 10;

my @projects = [
	{ name => 'linux', uri => "/p/linux" },
	{ name => 'git', uri => "/p/git" },
];

my @p_detail = ( 'linux', 'git' );

my $reports = {
	winners => {
		size    => 2652,
		commits => 3,
		a_lines => 154,
		r_lines => 23,
	},
	summary => {
		size    => 501238853,
		commits => 489234,
		files   => 39768,
		authors => 15214,
	},
	files_changed => { sum => $days * int rand(93), },
	last_x_days => {
		commits => undef,
		size    => undef,
		files_a => undef,
		files_r => undef,
		files_c => undef,
		lines_a => undef,
		lines_r => undef,
	},
};
my $rnd_range = {
	commits => 10,
	size    => 2000,
	files_a => 5,
	files_r => 3,
	files_c => 20,
	lines_a => 180,
	lines_r => 60,
};

my $json = JSON::XS->new->ascii->pretty->allow_nonref;
if ( exists $opts->{r} and $opts->{r} ) {
	die "Report '$opts->{r}' does not exists"
		unless exists $reports->{ $opts->{r} };
	if ( $opts->{r} eq 'last_x_days' ) {

		my $data;
		for my $i ( 1 .. $days ) {
			my $date = strftime "%Y-%m-%d", localtime (time - $i*86400 );
			push @{ $data->{x} }, $date;
			foreach my $metric ( keys %{ $reports->{last_x_days} } ) {
				my $multiply = 1;
				$multiply = -1 if $i eq 3 and $metric eq 'size';
				push @{ $data->{metrics}{ $metric} }, $multiply * int rand($rnd_range->{$metric});
			}
		}
		print $json->encode( { result => $data });
	} else {
		print $json->encode( { result => $reports->{ $opts->{r} } } );
	}
} elsif ( exists $opts->{r} ) {
	my @rep = map { { name => $_, uri => "/p/$opts->{p}/r/$_" } } keys %$reports;
	print $json->encode( { reports => \@rep });
} else {
	print $json->encode({ projects => \@projects });
}

=head1 NAME

gitdemo.pl

=head1 RESOURCES

B</project>

GET * -> <Projects>

B</project/<p>>B</report>

GET * -> Reports

B</project/<p>>B</report/<r>>

GET : days=INT -> Result

GET : * -> Result

=head1 STRUCTURE DESCRIPTION

B<Projects> = < projects : [{ name : String, uri : String }] >

B<Reports> = < reports : [{ name : String, uri : String }] >

B<Result> = < result :
		{ MetricName : String } |
		{ x : String,
		  metrics : { MetricName : [ String ] }
		}
>

B<MetricName> = String;

=head1 EXAMPLES

=over

=item B<gitdemo.pl> - response to /project resource.

=item B<gitdemo.pl -p linux -r ''> - response to /project/<p>/report.

=item B<gitdemo.pl -p linux -r summary> - /project/<p>/report/<r>

=item B<gitdemo.pl -p linux -r last_x_days -d 3> - /project/<p>/report/<r>?days=n.

=back

=head1 NOTES

Though the report last_x_days have a lot of metrics, client should
visualise this report as 4 different reports - as shown in the picture.

Reports ( Title - report name : metrics: ... ):

Yesterday winners - winners : a_lines, r_lines, commits, size

Summary - summary : commits, size, files, authors

Commits - last_x_days, : commits

Size - last_x_days: size

Changed, added, removed files - files_changed : sum; last_x_days : files_c, files_a, files_r

Lines - last_x_days: lines_a, lines_r

=cut
