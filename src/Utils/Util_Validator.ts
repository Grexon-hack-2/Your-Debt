export const regExps: { [key: string]: RegExp } = {
    emailRegex: /^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/,
    emailComplet:
      /^[a-zA-Z0-9_.-]+[@]+[a-zA-Z0-9-]+[.]+[A-Za-z0-9]{2,4}((?:[.]+[a-zA-Z0-9]{2,4})?)$/,
    alphaNumeric: /^[a-zA-Z0-9_-]*$/,
    alphaNumericwithtilde:
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9]+(\s{1}[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9]+)*$/,
    prefix: /^[A-Za-z0-9]*$/,
    number: /^\d*$/,
    special: /^[ A-Za-záéíóúÁÉÍÓÚñÑüÜ0-9_@./#&+-]*$/,
    email2:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    moreEmail: /^(([a-zA-Z\-0-9\.]+@)([a-zA-Z\-0-9\.]+)[,]*)+$/,
    regexPassword: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[-_]).{8,}$/,
    numberespecial: /^[0-5]*$/,
    uuidRegex:
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-5][0-9a-fA-F]{3}-[089abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    username: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[_-]).+$/,
    maxTaxes: /^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))%$/,
    maxReteica: /^(0(\.\d+)?|1(\.0+)?)%$/,
    decimalNumbers: /^\d{1,3}$|^\d{1,3}\.\d{1,2}$/,
    spaceEnd: /^\w+[^\s]$/,
    numberWDecimal: /^(\d*|(\d+))(\.\d+)?$/,
    telefonoRegex: /^\d{8,15}$/,
    regexcomma: /,/g,
    escapeCaracteresEspeciales:/[-\/\\^$*+?.()|[\]{}]/g
  };