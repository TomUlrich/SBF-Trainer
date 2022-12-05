# SBF Trainer

![](https://img.shields.io/badge/Project_Status-Complete-green.svg) ![](https://img.shields.io/badge/Built_with-JavaScript-F0DB4F.svg)

> Prüfungstrainer-App für den amtlichen Sportbootführerschein mit dem Geltungsbereich Binnenschifffahrtsstraßen.  
> Es werden
> Basisfragen (Frage 1 bis Frage 72)  
> Spezifische Fragen Binnen (Frage 73 bis Frage 253)  
> Spezifische Fragen Segeln (Frage 254 bis Frage 300)

![Example screenshot](./img/screenshot.PNG)

## Table of Contents

- [Technologies & Concepts](#technologies-concepts)
  - [HTML](#html)
  - [CSS](#css)
  - [JavaScript](#javascript)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Technologies & Concepts

### HTML

- link [Font Awesome](https://fontawesome.com/) stylesheet via [CDN](https://cdnjs.com/libraries/font-awesome)

### CSS

### JavaScript

#### fetch API
```javascript
fetch('./questions/test.json')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    // Do something for an error here
  });
```

## Acknowledgements

## Contact

Created by [@Thomas Ulrich](https://github.com/TomUlrich) - feel free to contact me!
