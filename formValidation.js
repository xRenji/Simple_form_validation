
/* Introduction: I' ve first created an object with all
 the fields of the form, i then checked each field in a switch statement everytime the form is submitted.
 Inside, each case i call the functions that will return a boolean defining if the field is valid or not.
 Each object value is then set equal to the respective boolean returned.
 Finally, i run a for loop inside an array containing the object values to check if all the fields
 are true/valid.
 
 In addition to the on submit validation, i have added onblur attributes to the fields in the html 
 document that call the respective functions for instant validation.
 
 
 */

// I have created an object containing all fields that need to be checked
const fields = {
  title: true,
  surname: true,
  firstName: true,
  dateOfBirth: true,
  postalAddress: true,
  suburb: true,
  postcode: true,
  daytimephone: true,
  mobile: true,
  work: true,
  email: true,
};
// This array handles the at least one phone required
const atLeastOnePhone = [false, false, false];
//This is the main function for validation on submit
function formValidation(myForm) {
  let valid = true;

  // On submit i check every field and run functions as needed
  for (let i = 0; i < myForm.length; i++) {
    //Singular fields
    switch (myForm[i].name) {
      case "title":
        fields.title = isRequired(myForm[i]);
        if (fields.title == true) {
          fields.title = isOtherChecked(myForm[i]);
        }
        break;
      case "surname":
        fields.surname = isRequired(myForm[i]);
        if (fields.surname == true) {
          fields.surname = isCharactersOnly(myForm[i]);
        }
        break;
      case "firstname":
        fields.firstName = isRequired(myForm[i]);
        if (fields.firstName == true) {
          fields.firstName = isCharactersOnly(myForm[i]);
        }
        break;
      case "dateofbirth":
        fields.dateOfBirth = isRequired(myForm[i]);
        if (fields.dateOfBirth == true) {
          fields.dateOfBirth = isDate(myForm[i]);
        }

        break;
      case "postaladdress":
        fields.postalAddress = isCharactersOnly2(myForm[i]);

        break;

      case "suburb":
        fields.suburb = isCharactersOnly(myForm[i]);

        break;
      case "postcode":
        fields.postcode = isPostCode(myForm[i]);

        break;
      case "daytimephone":
        fields.daytimephone = isPhone(myForm[i]);
        atLeastOnePhone[0] = isThereAPhone(myForm[i]);
        break;
      case "mobile":
        fields.mobile = isMobile(myForm[i]);
        atLeastOnePhone[1] = isThereAPhone(myForm[i]);
        break;
      case "work":
        fields.work = isPhone(myForm[i]);
        atLeastOnePhone[2] = isThereAPhone(myForm[i]);
        fields.work = checkForPhone(myForm[i]);
        break;
      case "email":
        fields.email = isEmail(myForm[i]);

        break;
    }
  }

  //Here, i created an array containing all the values of the object fields
  const fieldsValues = Object.values(fields);
  //Then i check every value before validating the whole form
  for (let i = 0; i < fieldsValues.length; i++) {
    if (fieldsValues[i] == false) {
      valid = false;
    }
  }
  return valid;
}

// ##### FIELDS CHECKS #####

//This function checks if the field is required
function isRequired(input) {
  let required;
  if (input.attributes["required"]) {
    if (input.value == "") {
      required = false;
      thisIsError(input, `${inputField(input)} is required`);
    } else {
      required = true;
      thisIsNotError(input);
    }
  }
  return required;
}

//This function checks for alphabetic, space and hyphen only
function isCharactersOnly(input) {
  let charactersOnly;

  if (input.value.match(/[^-\sa-zA-Z]/)) {
    charactersOnly = false;
    thisIsError(
      input,
      `${inputField(
        input
      )} must contain alphabetic, space [ ], hyphen [-] characters only`
    );
  } else {
    charactersOnly = true;
    thisIsNotError(input);
  }

  return charactersOnly;
}
//This function checks for number,alphabetic,space,hyphen and slash only
function isCharactersOnly2(input) {
  let charactersOnly;

  if (input.value.match(/[^[0-9a-zA-Z/ -]+$/)) {
    charactersOnly = false;
    thisIsError(
      input,
      `${inputField(
        input
      )} must contain Number, alphabetic, space [ ], hyphen [-], and slash [/] characters only`
    );
  } else {
    charactersOnly = true;
    thisIsNotError(input);
  }

  return charactersOnly;
}
//This function checks for the right format of date, dd/mm/yyyy
function isDate(input) {
  let myDate;

  if (
    !input.value.match(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
    )
  ) {
    myDate = false;
    thisIsError(input, `${inputField(input)} must be in the format dd/mm/yyyy`);
  } else {
    myDate = true;
    thisIsNotError(input);
  }

  return myDate;
}
//This function checks for 4 digits only
function isPostCode(input) {
  let postCode;

  if (input.value.match(/^[0-9]{4}$/) || input.value.match(/^\s*$/)) {
    postCode = true;
    thisIsNotError(input);
  } else {
    postCode = false;
    thisIsError(input, `${inputField(input)} must contain 4 digits only`);
  }

  return postCode;
}
//This function checks if it's a valid number
function isPhone(input) {
  let phoneNumber;

  if (
    input.value.match(/^[0-9]{8}$/) ||
    input.value.match(/^[0-9]{10}$/) ||
    input.value.match(/^\s*$/)
  ) {
    phoneNumber = true;
    thisIsNotError(input);
  } else {
    phoneNumber = false;
    thisIsError(input, `${inputField(input)} must contain 8 or 10 digits only`);
  }

  return phoneNumber;
}
//This function checks if it is a valid mobile number
function isMobile(input) {
  let phoneNumber;

  if (input.value.match(/^04[0-9]{8}$/) || input.value.match(/^\s*$/)) {
    phoneNumber = true;
    thisIsNotError(input);
  } else {
    phoneNumber = false;
    thisIsError(
      input,
      `${inputField(input)} 10 numeric digits, must start with 04`
    );
  }

  return phoneNumber;
}
//This function checks if it is a valid e-mail
function isEmail(input) {
  let Email;

  if (
    input.value.match(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    ) ||
    input.value.match(/^\s*$/)
  ) {
    Email = true;
    thisIsNotError(input);
  } else {
    Email = false;
    thisIsError(input, `${inputField(input)} Must be a valid E-mail`);
  }

  return Email;
}

//This function checks if there is a phone
function isThereAPhone(input) {
  let thereIsAPhone;
  if (input.value == "") {
    thereIsAPhone = false;
  } else {
    thereIsAPhone = true;
  }

  return thereIsAPhone;
}
//This function checks if there is at least one phone
function checkForPhone(input) {
  let checkForPhone = true;

  if (input.value.match(/^\s*$/)) {
    if (atLeastOnePhone[0] == false && atLeastOnePhone[1] == false) {
      checkForPhone = false;
      thisIsError(input, ` There must be at least a valid phone`);
      thisIsError(
        document.getElementById("mobile"),
        ` There must be at least a valid phone`
      );
      thisIsError(
        document.getElementById("dayTimePhone"),
        ` There must be at least a valid phone`
      );
    }
  }

  return checkForPhone;
}

// ##### AS ABOVE SECTION #####

//This function copies the input in the following section
function copyFamily() {
  if (document.getElementById("asAbove").checked) {
    document.getElementById(
      "RelationshipToPatient2"
    ).value = document.getElementById("RelationshipToPatient").value;
    document.getElementById(
      "EmergencyContactPerson2"
    ).value = document.getElementById("EmergencyContactPerson").value;
    document.getElementById("emergencyMobile2").value = document.getElementById(
      "emergencyMobile"
    ).value;
    document.getElementById(
      "dayTimePhoneEmergency2"
    ).value = document.getElementById("dayTimePhoneEmergency").value;
  } else {
    document.getElementById("RelationshipToPatient2").value = "";
    document.getElementById("EmergencyContactPerson2").value = "";
    document.getElementById("emergencyMobile2").value = "";
    document.getElementById("dayTimePhoneEmergency2").value = "";
  }
}

// ##### OTHER CHECK #####

//This function checks for the other input in the first field
function isOtherChecked(input) {
  let otherChecked;
  if (
    document.getElementById("toCheckOther").value == "" &&
    document.getElementById("title").value == "Other"
  ) {
    otherChecked = false;
    thisIsError(input, `Other is required`);
  } else {
    otherChecked = true;
    thisIsNotError(input);
  }
  return otherChecked;
}
//This function checks if other is selected, and eventually displays the other input
function otherSelected() {
  let other = document.getElementById("title").value;
  if (other == "Other") {
    document.getElementById("OtherText").style.display = "inline-block";
  } else document.getElementById("OtherText").style.display = "none";
}

// ##### ERROR HANDLING #####

//This function check how to handles errors, in particular changes the class of the span element
//diplaying the error.
function thisIsError(input, message) {
  const ifError = input.parentElement;
  ifError.className = "if-error error";
  const span = ifError.querySelector("span");
  span.innerText = message;
}
//This function gets the input field to be displayed in error
function inputField(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//This function handles the no errors
function thisIsNotError(input) {
  const ifNotError = input.parentElement;
  ifNotError.className = "if-error success";
}
