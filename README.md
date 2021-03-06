# wd-gdocs-addons

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

A set of scripts that make life easier and work with the data of employees & volunteer & members of the Citizens Network Watchdog Poland

![Demo](http://cdn.files.jawne.info.pl/private_html/2019_09_see5Au9uik4IechietuveeNge6moong9aevaegahcie7ooz6du/zalacznik.gif
)

Repository consists:

* ```addon``` - GSuite extensions
* ```app``` - NodeJS API to expose unpublic data


## Available functions

### GovDataByRegon

Arguments:

* REGON – determines institution ID
* any of following – ```name```, ```nip```, ```regon14```, ```regon9```, ```regon```, ```postal_code```, ```city```, ```voivodeship```, ```community```, ```county```, ```street```, ```house_no```, ```flat_no```, ```teryt``` – determines returned data, ```name``` by default

#### Examples

Value:

```excel
=GovDataByRegon('000678239')
```

Output:

```excel
Bałtycka Galeria Sztuki Współczesnej w Słupsku
```

Values:

```excel
=GovDataByRegon("000678239";"teryt")
```

Output:

```excel
0977278
```

#### Alternatives

* ```GovDataByNip``` function is also available. The signature is identical, except first argument is NIP.

### FederByRegon

Arguments:

* REGON – determines institution ID
* any of following – ```name```, ```regon```,```id``` – determines returned data, ```name``` by default

#### Examples

Values:

```excel
=FederByRegon('000678239');
```

Output:

```excel
Bałtycka Galeria Sztuki Współczesnej w Słupsku
```