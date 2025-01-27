import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: true })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(
    passwordConfirm: string,
    args: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (passwordConfirm === args.object[args.constraints[0]]) {
      return true;
    } else {
      return false;
    }
  }
  defaultMessage(): string {
    return 'No coinciden las contraseñas';
  }
}
