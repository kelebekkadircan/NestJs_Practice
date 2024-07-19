import { Injectable } from '@nestjs/common';
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { I18nHttpException } from '../exceptions/custom/i18n-http-exception';
import { UserService } from '@app/modules/core/user/services/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserDuplicate implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(id: string) {
    const user = await this.userService.findOne(id)
    if (user) {
      throw new I18nHttpException('common.user.alreadyExist', 404);
    }
    return true;
  }
}

export function IsUserDuplicate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserDuplicate,
    });
  };
}
