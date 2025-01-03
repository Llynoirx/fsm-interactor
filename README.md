
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!-- ![Contributors][contributors-shield]][contributors-url]-->
<!--[![Forks][forks-shield]][forks-url]-->
<!--[![Stargazers][stars-shield]][stars-url]-->
<!-- [![Issues][issues-shield]][issues-url]-->
<!--[![MIT License][license-shield]][license-url]-->
<!--[![LinkedIn][linkedin-shield]][linkedin-url]-->

<!-- HEADER -->
<br />
  <h1 align="center">FSM-Interactors</h1>
  <p align="center">Build FSM-based (Finite State Machine) Interactor objects
    <br />
    <a href="https://github.com/llynoirx/fsm-interactor"><strong>Explore the docs »</strong></a>
   </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary><strong>TABLE OF CONTENTS<strong/></summary>
  <ol>
    <li>
      <a href="#project-overview">Project Overview</a>
      <ul>
        <li><a href="#background">Background</a></li>
        <li><a href="#objectives">Objectives</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#how-to-run">How to Run</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
     <ul>
        <li><a href="#contributors">Contributors</a></li>
      </ul>
     <li><a href="#contact">Contact</a></li>
    <li><a href="#related-projects">Related Projects</a></li>
  </ol>
</details>


<!-- PROJECT OVERVIEW -->
## Project Overview:
![Project Walkthrough](https://github.com/Llynoirx/fsm-interactor/blob/main/proj3.gif)

### Background:
* 05-431: Software Structure for UI -- Project 3


### Objectives:
* Modify files to build FSM-based (Finite State Machine) Interactor objects, then test them in src/test_cases.ts. You must also create your own custom interactor object and test cases

### Features:
<figure>
  <img src="https://github.com/Llynoirx/fsm-interactor/blob/main/joystick.png" alt="Joystick Image" width="300"/><br>
  <figcaption>Joystick Interactor</figcaption>
</figure>
<br>
<br>
<figure>
  <img src="https://github.com/Llynoirx/fsm-interactor/blob/main/numbers.png" alt="Numbers Image" width="300"/><br>
  <figcaption>Numbers Interactor</figcaption>
</figure>
<br>
<br>
<figure>
  <img src="https://github.com/Llynoirx/fsm-interactor/blob/main/customForm.png" alt="Custom Form Interactor Image" width="300"/><br>
  <figcaption>Custom Form Interactor w/ radio buttons, textbox, checkboxes, and rotary dial</figcaption>
</figure>

### Built With:
* Typescript

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* Install webserver
  ```sh
  npm install express
  ```

### How to Run
1. Clone the repo
   ```sh
   git clone https://github.com/llynoirx/fsm-interactor.git
   ```
3. Transpile all .ts to .js and .js.map files by typing the following into the terminal:
   ```sh
   tsc
   ```
4. Start the server by typing the following into the terminal:
   ```sh
   npm run start
   ```
5. Open up browser and type:
   ```sh
   localhost:80
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap
* src/FSMInteractor.ts
  - FSMInteractor class: {fsm object, position, parent/root}
  - TODOS:
    - [x] set x
    - [x] set y
    - [x] set parent
    - [x] damage(): update display for obj
    - [x] draw()
    - [x] pick(): determine list of regions in our controlling FSM
    - [x] bookkeeping for displayRawEvent()
    - [x] displayRawEvent():  translate raw events into higher-levels ones formulated in terms of regions of FSM 
* src/FSM.ts
  - FSM class: machine that consists of:
    1. list of regions: area (bounding box) within parent FSMInteractor, img
    2. list of states: stateName, list of transitions out of state- eventSpec obj which describes what events will cause event to fire, target state, list of actions to be executed when transition taken
  - TODOS: 
    - [x] damage()
    - [x] _finalize(): Initially set up and connect various parts making up FSM (ie. looking up region, state names, linking/binding corresponding objs)
    - [x] reset(): Reset FSM to start state. 
    - [x] actOnEvent(): Cause FSM to act on given event (make one transition)
* src/FormInteractor.ts
    - Custom form interactor on course reflection including radio buttons, textbox, checkboxes, and rotary dial
* src/Root.ts
    - class for root obj which manages connection w/ canvas, form interactor, and does other global tasks like redraws
    - TODO: 
      - [x] _redraw()
* src/Region.ts
  - class for region objs {name, bounding-box, img(optional)}
  - TODOs
    - [x] set x
    - [x] set y
    - [x] set w
    - [x] set h
    - [x] set parent
    - [x] pick(): determine if position inside or over region
    - [x] draw()  
    - [x] damage() 
* src/Transition.ts
    - class for single transition within FSM (eventspec, list of actions, state to move FSM to)
    - TODO: 
    - [x] match(): determine if transition should be matched by given event
    - [x] bindTarget() 
* src/Action.ts
  - class for transition action {act: set_img, clear_img, none, print, print_event, region to act on, param}
  - TODOS:
    - [x] execute(): carry out action
    - [x] bindRegion(): find region name from FSM list of regions 
* src/EventSpec.ts
  - class for objects that need specify event for FSM transition  
  - TODO: 
    - [x] bindRegion()
    - [x] match(): match against actual event
* src/State.ts
    - class for FSM state obj (name, transition obj list)
* src/Check.ts..
  - utility class for runtime type checks (objs from json)
* src/Err.ts
  - class for error handling: silent, message, full_message, throw
* src/test_cases.ts



<!-- See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Acknowledgements

### Contributors
* Kathy Ho | Student at Carnegie Mellon University (CMU)
* Scott Hudson | Professor at CMU's Human Computer Interaction Institute (HCII) for 05-431
* Frank Elavsky | Teaching Assistant for 05-431

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact
* Email: hokathyd@gmail.com
* Linkedin: https://www.linkedin.com/in/hokathyd/

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Related Projects 
* 05-431 | SSUI Project 1 - [Fitts Law Tester](https://github.com/Llynoirx/fitts-law-tester)
* 05-431 | SSUI Project 2 - [UI Renderer](https://github.com/Llynoirx/ui-renderer)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
