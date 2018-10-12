# piano-chords-svg

Piano and keyboard chords.

https://crisstanza.github.io/piano-chords-svg/

File:

    /etc/apache2/httpd.conf

Alias:

    Alias /piano-chords-svg "/path-to/piano-chords-svg/"
    <Directory "/path-to/piano-chords-svg/">
        Require all granted
    </Directory>

Permissions:

    chmod -R 755 ~/Documents/GitHub/

Restart:

    sudo apachectl -k restart