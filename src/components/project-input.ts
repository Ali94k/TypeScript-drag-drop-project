import { Component } from './base-components'
import { autobind } from '../decorators/autobind'
import { Validateable, validate } from '../util/validation'
import { projectState } from '../state/project-state'

// Project Input Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElemnet: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement
    this.peopleInputElemnet = this.element.querySelector(
      '#people'
    ) as HTMLInputElement

    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElemnet.value

    const titleValidatable: Validateable = {
      value: enteredTitle,
      required: true,
    }

    const descriptionValidatable: Validateable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    }

    const peopleValidatable: Validateable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    }

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!')
      return
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElemnet.value = ''
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    console.log(this.titleInputElement.value)
    const userInput = this.gatherUserInput()

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      console.log(title, desc, people)
      projectState.addProject(title, desc, people)
      this.clearInputs()
    }
  }
}
