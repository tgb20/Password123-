# Team Password123!

## Team Members
[Jacob Bashista](https://github.com/lcousins/Password123-/blob/master/team/JACOB_BASHISTA.md)

[Lucy Cousins](https://github.com/lcousins/Password123-/blob/master/team/LUCY_COUSINS.md)

[Andrew Yetts](https://github.com/lcousins/Password123-/blob/master/team/ANDREW_YETTS.md)

## Project Overview
Our project is going to allow people to generate better forms of their common password. They will provide their current password they overuse and locally in the browser variations on the password will be generated based on several different password design standards.

Our project will be targeting people who reuse their password often such as older people, less tech savvy people, and the like. Because of this our website will be designed to be simple to read and operate with large buttons and text, clear instructions, and quick settings to say what the password will be used for and print options.


## Topic Requirements
- Mobile
- Password Hashing
- Authentication (possible if we allow saving password)
- Server-side (We plan to write our own webserver)


# API Endpoints:
### GET getRandomWords

Returns 5 random words up to 5 characters in length

Example URL: `https://password123cs326.herokuapp.com/api/getRandomWords`

Example Return:
```
{
    "words": [
        "seat",
        "pond",
        "fur",
        "labor",
        "work"
    ]
}
```

### POST addPassword

Adds a hash to the database

Example URL: `https://password123cs326.herokuapp.com/api/addPassword?hash=hi`

Example Return:
```
{
    "success": true
}
```


### POST checkMatchingPassword

Lets you know if the hash has already been stored on the database

Example URL: `https://password123cs326.herokuapp.com/api/checkMatchingPassword?hash=hi`

Example Returns:
```
{
    "unique": true
}
```
```
{
    "unique": false
}
```
