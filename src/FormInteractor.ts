import { Root } from "./Root.js";

//===================================================================
// Class for custom FSM Interactor: Course Reflection Form
// Responsible for creating and managing interactive form elements including 
// Radio buttons, Textboxes, Checkboxes, Rotary Dial, and Submit button
//===================================================================

export class FormInteractor {
    root: Root;
    constructor(root: Root) {
        this.root = root;  
    }

    // Create group of radio buttons (single selection bubbles)
    public createRadioButtons(options: string[]): HTMLElement {
        const radiosGrp = document.createElement('div');
        radiosGrp.style.marginBottom = '15px';
        
        // For every option, create radio button on a new line w/ corresponding option text 
        // each radio has unique idx value and added to radio group
        options.forEach((opt, idx) => {
            const radioOpt = document.createElement('div');
            const optText = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'radioGroup';
            radio.value = `option${idx + 1}`;
            optText.appendChild(radio);
            optText.appendChild(document.createTextNode(opt));
            radioOpt.appendChild(optText);
            radiosGrp.appendChild(radioOpt);
        });
        return radiosGrp;
    }

    // Creates text input field; has placeholder text if nothing typed in
    public createTextBox(placeholder: string): HTMLInputElement {
        const textInpt = document.createElement('input');
        textInpt.type = 'text';
        textInpt.placeholder = placeholder;
        textInpt.style.display = 'block';
        textInpt.style.marginBottom = '15px';
        return textInpt;
    }

    // Create group of checkboxes
    public createCheckboxes(options: string[]): HTMLElement {
        const checkboxGrp = document.createElement('div');
        checkboxGrp.style.marginBottom = '15px';

        // For every option, create checkbox on a new line w/ corresponding option text 
        // each checkbox has unique idx value and added to checkbox group
        options.forEach((opt, idx) => {
            const checkboxOpt = document.createElement('div');
            const optText = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = `check${idx+1}`;
            optText.appendChild(checkbox);
            optText.appendChild(document.createTextNode(opt));
            checkboxOpt.appendChild(optText);
            checkboxGrp.appendChild(checkboxOpt);
        });
        return checkboxGrp;
    }


    // Half-circle rotary dial that has an dial indicator that allows you to move from 0% (leftmost) to 100% (rightmost)
    public createRotaryDial(): HTMLElement {

        // Create and style rotation dial to appear as half-circle
        const rotDial = document.createElement('div');
        rotDial.style.position = 'relative';
        rotDial.style.width = '200px';
        rotDial.style.height = '100px';
        rotDial.style.borderTopLeftRadius = '100px';
        rotDial.style.borderTopRightRadius = '100px';
        rotDial.style.border = '2px solid #ccc';
        rotDial.style.overflow = 'hidden';
    
        // Create and style dial indicator (needle/arm of rotary dial)
        const dialIndicator = document.createElement('div');
        dialIndicator.style.position = 'absolute';
        dialIndicator.style.width = '5px';
        dialIndicator.style.height = '120px';
        dialIndicator.style.backgroundColor = '#333';
        dialIndicator.style.top = 'calc(100% - 120px)';
        dialIndicator.style.left = '50%';
        dialIndicator.style.transformOrigin = 'center 100%';
        dialIndicator.style.transform = 'rotate(-90deg)';
        rotDial.appendChild(dialIndicator);
    
        // Create and style percentage display
        const percent = document.createElement('div');
        percent.style.position = 'absolute';
        percent.style.top = '10px';
        percent.style.left = '50%';
        percent.style.transform = 'translateX(-50%)';
        percent.style.fontSize = '16px';
        percent.style.fontWeight = 'bold';
        percent.textContent = '0%';
        rotDial.appendChild(percent);
    
        let isRotating = false;
        let startAngle = -Math.PI / 2;
        let currAngle = -Math.PI / 2;
        
        //Update percentage display based on dial's current angle/placement
        const updatePercent = () => {
            const normalizedAngle = currAngle + Math.PI / 2;
            const percentage = Math.round((normalizedAngle / Math.PI) * 100);
            percent.textContent = `${Math.min(Math.max(percentage, 0), 100)}%`;
        };
    
        //Check when user starts interacting w/ dial (mouse down)
        rotDial.addEventListener('mousedown', (e) => {
            isRotating = true;
            startAngle = Math.atan2(
                e.clientY - (rotDial.offsetTop + rotDial.offsetHeight),
                e.clientX - (rotDial.offsetLeft + rotDial.offsetWidth / 2)
            );
        });
    
        //Check for mouse movement to rotate dial
        document.addEventListener('mousemove', (e) => {
            if (isRotating) {

                // Calculate and update curr angle, clamping it within -90 to 90 degrees
                const angle = Math.atan2(
                    e.clientY - (rotDial.offsetTop + rotDial.offsetHeight),
                    e.clientX - (rotDial.offsetLeft + rotDial.offsetWidth / 2)
                );
                const deltaAngle = angle - startAngle;
                currAngle = Math.max(
                    -Math.PI / 2,
                    Math.min(Math.PI / 2, currAngle + deltaAngle)
                );

                // Apply new angle to dial indicator and update percent display and start angle for next movement
                dialIndicator.style.transform = `rotate(${currAngle * (180 / Math.PI)}deg)`;
                updatePercent();
                startAngle = angle;
            }
        });
    
        //Stop rotation when user releases mouse or leaves window
        document.addEventListener('mouseup', () => {isRotating = false;});
        document.addEventListener('mouseleave', () => {isRotating = false; });
        
        return rotDial;
    }

    //Create submit button that submits form on click
    public createSubmitButton(label: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = label;
        button.style.display = 'block';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            onClick();
        });
        return button;
    }

    //Create centered form title
    public createTitle(titleText: string): HTMLElement {
        const title = document.createElement('h2');
        title.textContent = titleText;
        title.style.textAlign = 'center';
        title.style.marginBottom = '20px';
        return title;
    }

    //Create bolded question text
    public createQuestion(questionText: string): HTMLElement {
        const question = document.createElement('p');
        question.textContent = questionText;
        question.style.marginBottom = '10px';
        question.style.fontWeight = 'bold';
        return question;
    }

    // Make a "Course Reflection Form" Interactor that uses 
    // radio buttons, textbox, checkboxes, and rotary dial asking for
    // course name, professor name, what we liked about the course, and overall course satisfaction
    public createFormInteractor(): void {
        //Check if there exists form w/ same ID to avoid duplication
        const existingForm = document.getElementById('formInteractor');
        if (!existingForm) {
            
            //Style outline of form 
            const form = document.createElement('form');
            form.id = 'formInteractor';
            form.style.top = '20px';
            form.style.right = '20px';
            form.style.border = '1px solid #ccc';
            form.style.padding = '30px';
            form.style.backgroundColor = '#f9f9f9';
            form.style.borderRadius = '10px';
            form.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            form.style.width = '600px';
            form.style.height = 'auto';

            const title = this.createTitle('Course Reflection Form');
            form.appendChild(title);


            //Set of radio buttons for class selection
            form.appendChild(this.createQuestion('Select which class you are filling this form out for:'));
            const radioButtons = this.createRadioButtons(['05-431', '15-210', '15-259', '85-211', '07-300']);
            form.appendChild(radioButtons);

            //Text input box for specifying the professor's name
            form.appendChild(this.createQuestion('Who was the Professor?'));
            const textBox = this.createTextBox('Type Professor name...');
            form.appendChild(textBox);

            //Set of checkboxes for what we liked abt course 
            form.appendChild(this.createQuestion('What did you like about the course?'));
            const checkboxes = this.createCheckboxes(['Teaching Style', 'Content', 'Projects', 'Course Structure']);
            form.appendChild(checkboxes);

            //Rotary dial for rating course satisfaction
            form.appendChild(this.createQuestion('How would you rate your overall satisfaction with the course?'));
            const rotaryDial = this.createRotaryDial();
            form.appendChild(rotaryDial);

            //Submit button w/ alert action on submission
            const submitButton = this.createSubmitButton('Submit', () => alert('Form submitted!'));
            form.appendChild(submitButton);
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Form submitted!');
            });

            document.body.appendChild(form);
        }
    }
}

