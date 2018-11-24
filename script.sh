#!/usr/bin/expect
# addip address
set URL [lindex $argv 0];
set REPO [lindex $argv 1];
spawn  ssh -o "StrictHostKeyChecking no" -t isha@172.23.238.210 "sh script.sh $URL $REPO"
expect "password:"
send "niit@123\n"
interact

