
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

# Cheetah forms

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<a href="https://www.buymeacoffee.com/pk6IU5J" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

<br />
<p align="center">
  <a href="https://github.com/siebevh/Cheetah-forms">
    <img src="./images/logo.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Cheetah Forms</h3>

  <p align="center">
    An Json Based Form Generator for Vuetify!
    <br />
    <a href="https://github.com/siebevh/Cheetah-forms"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.cheetah-form.site">View Demo</a>
    ·
    <a href="https://github.com/siebevh/Cheetah-forms/issues">Report Bug</a>
    ·
    <a href="https://github.com/siebevh/Cheetah-forms/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

Cheetah Forms is a simple JSON form builder for generating a Vuetify Form with just a JSON. 
Cheetah Forms uses Vuetify to make you form a Material designed form

#### Fields Form
![fields Form](./images/fields-form.png)

#### Groups Form
![groups Form](./images/groups-form.png)

#### Features:
  * JSON based
  * Grid support
  * Default fields
  * Validation
  * Default style

### Built With
* [Vuetify (v1.5)](https://vuetifyjs.com/en/)
* [Vue](https://vuejs.org/)



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation


1. Install NPM packages
```sh
npm install cheetah-form
```


<!-- USAGE EXAMPLES -->
## Usage

### Basic usage
```
    <cheetah-form :schema="schema" :model="model" @save="save"></cheetah-form>
```
##### with:
 * `schema`: the json configuration of the form (required)
 * `model`: the starting value of your model (required)
 * `@save`: event for handeling the save (returns edited model)
 
### JSON FORM FORMAT
```
{
    "code": "profile-parent",
    "title": "title",
    "subtitle": "subtitle",
    "fields": [{
        "type": "text-field",
        "name": "Naam",
        "required": true,
        "model": "name",
        "cols": {...}
    },
    "groups": []
}

```
##### with:
 * `code`: the form unique code
 * `title`: the title of the form (optional)
 * `subtitle`: ths subtitle of the form (optional)
 * `fields`:  array of fields for the form (is ignored is groups has a value)
 * `groups`: when you want to create a form of multiple parts use groups

### JSON FIELD FORMAT
```
{
    "type": "text-field",
    "name": "Name",
    "required": true,
    "disabled": false,
    "placeholder": 'placeholder',
    "hint": 'hint',
    "model": "user.name",
    "prefix": "+32",
    "cols": 12
}

```
##### with:
 * `type`: the type of field (check suported types) (required)
 * `name`: the label of the field (required) 
 * `model`: model in doted notation (required)
 * `required`: if the field is required or not (optional)
 * `disabled`: if the field is disabled or not (optional)
 * `placeholder`: the placeholder (optional)
 * `hint`: the hint (optional)
 * `prefix`: a prefix added before the field (optional)
 * `cols`: the width of the field (1-12, default: 12) 
 
### JSON GROUP FORMAT
```
{
    "id": 1,
    "title": "Name",
    "fields": [],
}

```
##### with:
 * `id`: id of the group (required)
 * `title`: the title of the group (required)
 * `fields`: array of fields (see Json Field format) (required)
 
### SUPPORTED TYPES
 * `text-field`: a normal text field
    ###### special additional options: 
   * number field
        ```
        attributes: {
            type: 'number',
            min: 1000
            max: 1000
        }
        ```
 * `textarea`: a normal textarea
    ###### special additional options: 
      
 * `select`: a normal select
     ###### special additional options: 
     * string items
        ```
         items: ['Men', 'Woman']
        ```
     
     * object items
        ```
        itemValue: 'key',
        itemText: 'label',
        items: [{
          'label': 'label',
          'key': 'someKey',
        },{
          'label': 'label2',
          'key': 'someKey2',
        }]
          ```
          
 * `combobox`: a combobox
      ###### special additional options: 
      * string items
         ```
          items: ['Men', 'Woman']
         ```
      
      * object items
         ```
         itemValue: 'key',
         itemText: 'label',
         items: [{
           'label': 'label',
           'key': 'someKey',
         },{
           'label': 'label2',
           'key': 'someKey2',
         }]
           ```
          
 * `toggler`: a switch
      ###### special additional options: 
      
 * `radio`: radio 
      ###### special additional options: 
      * object items
          ```
              options: [{
                'label': 'label',
                'value': 'someKey',
              },{
                'label': 'label2',
                'value': 'someKey2',
              }]
          ```
 
 * `checkbox`: a simple checkbox 
       ###### special additional options: 
       
 * `password`: a password input field with hide and reviel option
       ###### special additional options: 

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/siebevh/Cheetah-forms/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Siebe Vander Henst - [@vh_siebe](https://twitter.com/vh_siebe) - vhsiebe@gmail.com

Project Link: [https://github.com/siebevh/Cheetah-forms](https://github.com/siebevh/Cheetah-forms)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements




<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/siebevh/Cheetah-forms.svg
[contributors-url]: https://github.com/siebevh/Cheetah-forms/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/siebevh/Cheetah-forms.svg
[forks-url]: https://github.com/siebevh/Cheetah-forms/network/members
[stars-shield]: https://img.shields.io/github/stars/siebevh/Cheetah-forms.svg
[stars-url]: https://github.com/siebevh/Cheetah-forms/stargazers
[issues-shield]: https://img.shields.io/github/issues/siebevh/Cheetah-forms.svg
[issues-url]: https://github.com/siebevh/Cheetah-forms/issues
[license-shield]: https://img.shields.io/github/license/siebevh/Cheetah-forms
[license-url]: https://github.com/siebevh/Cheetah-forms/blob/master/LICENSE.txt
