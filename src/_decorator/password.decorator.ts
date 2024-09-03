import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsValidPassword(options?: ValidationOptions) {
  return (object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: string) {
          // 至少8位,包含数字,大小写字母和特殊字符
          const reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_\-+=`])[A-Za-z\d~!@#$%^&*()_\-+=`]{8,}$/);
          return reg.test(value);
        },
      },
    });
  };
}
