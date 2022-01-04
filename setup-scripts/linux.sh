#!/usr/bin/env bash
# Initial set up

# UFW Port Firewall Setup
# Enables ports 80 & 3006
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default deny outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 3006
sudo ufw enable
