# Identicon app [Angular]

The application creates downloadable identicons. Identicon is automatically generated profile image made from some text, usually the name string. It consists of 5×5 block matrix out of which fourth and fifth columns are mirrored second and first respectively. This means that the shape could be determined by only 15 bits of information. Input string is converted to MD5 hash 16 bit hex-decimal and again converted to decimal array storing 16 numeric values ranging from 0 to 255 which is convenient for creating identicon shape and color.

![identicon-thumb](https://user-images.githubusercontent.com/31347233/54619712-57668680-4a65-11e9-8b00-7ddaf9c4b481.jpg)

## Project Objectives

- identicon shape and color created from input string using MD5 hash
- identicon is unique to each string
- identicon image needs to be downloadable as bitmap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
