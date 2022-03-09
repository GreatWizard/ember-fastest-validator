import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

import Validator from 'ember-fastest-validator/validators/fastest-validator';

const LOGIN_SCHEMA = {
  login: { type: 'email' },
  password: { type: 'string', empty: false },
};

export default class LoginFormComponent extends Component {
  @service fastestValidator;

  constructor() {
    super(...arguments);
    this.validator = new Validator(getOwner(this), LOGIN_SCHEMA);
  }

  @action
  updateLanguage(event) {
    switch (event.target.value) {
      case 'fr':
        this.fastestValidator.addMessages({
          stringEmpty: "Le champ '{field}' ne doit pas être vide.",
          emailEmpty: "Le champ '{field}' ne doit pas être vide.",
          required: "Le champ '{field}' est obligatoire.",
        });
        break;
      default:
        this.fastestValidator.resetMessages();
        break;
    }
  }

  @action
  changeValue(key, event) {
    this.validator.data = { ...this.validator.data, [key]: event.target.value };
  }

  @action
  submit(event) {
    event.preventDefault();
    // Do something
  }
}
