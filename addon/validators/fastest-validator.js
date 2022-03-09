import { tracked, cached } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default class FastestValidator extends EmberObject {
  @service fastestValidator;

  @tracked schema;

  @tracked data;

  @tracked options;

  constructor(owner, schema) {
    super(owner);
    this.schema = schema;
  }

  @cached
  get validate() {
    return this.fastestValidator.instance.compile(this.schema);
  }

  @cached
  get errors() {
    let validOrErrors = this.validate(this.data, this.options);
    if (validOrErrors !== true) {
      return validOrErrors;
    }
    return [];
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  get isValid() {
    return this.errors.length === 0;
  }
}
