## COML - Config-Oriented Markup Language

### Changelog

`v0.0.1` - 10.02.2023
Features added:

Inline comments:

```hs
# Comment section
```

Inline string variables:

```hs
HOST 127.0.0.1
PORT 3000
```

Inline variables with types auto-resolving:

```hs
HOST: "127.0.0.1"
PORT: 3000 # will be a number

# it supports expressions
# like concatenation:
TITLE: "Hello " + "world!"

# and multiline assigment:
TITLE:
"Hello " +
"world!"

# and math ops:
SUM: 10 * 200
```

Define local variables:

```hs
PORT 3000 :PORT
# or
3000 :PORT

# usage:
PORT $PORT
# it has short form:
$PORT
```

String interpolation:

```hs
url https://{HOST}:{PORT}/api
```

Namespaces $ block scopes:

```hs
# Namespace:
[dev]
PORT 3000

# Disabled block scope:
[-]
```

Collections:

```hs
# list/vector:
FRUITS: !apple banana peach

# and multiline assign:
FRUITS:
    apple banana peach
    melon grape

# matrix:
PRICE:
    0 1 2,
    2 3 1,
    3 0 4,

# tensor:
PRICE:
    [0 1] [0 2],
    [0 1] [0 2],

# hash-map:
USER:
name = Max
password = 123

# tuple:
PRICE: (100, USD, "$")

```
