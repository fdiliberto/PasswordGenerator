const passwordLength = 10;
let drawns = [];

function generatePassword() {
  let pwdFirst = "";
  let pwdSecond = "";
  const type = getPasswordType();

  switch (type) {
    case "mixed":
      pwdFirst = buildMixedRandomPassword();
      pwdSecond = buildMixedRandomPassword();
      break;
    case "letters":
      pwdFirst = buildOnlyLettersRandomPassword();
      pwdSecond = buildOnlyLettersRandomPassword();
      break;
    case "numbers":
      pwdFirst = buildOnlyNumbersRandomPassword();
      pwdSecond = buildOnlyNumbersRandomPassword();
      break;
  }

  document.getElementById("pwd-value-first").textContent = pwdFirst;
  document.getElementById("pwd-value-second").textContent = pwdSecond;
  setCopyToClipboardVisibility(true);
}

function getPasswordType() {
  return document.querySelector('input[name="password-type"]:checked').value;
}

function buildMixedRandomPassword() {
  return buildRandomPassword([...letters, ...numbers, ...specialChars]);
}

function buildOnlyLettersRandomPassword() {
  return buildRandomPassword(letters);
}

function buildOnlyNumbersRandomPassword() {
  return buildRandomPassword(numbers);
}

function buildRandomPassword(collection) {
  let pwd = "";

  for (let i = 0; i < passwordLength; i++) {
    let index = getRandomIndex(collection);
    let char = collection[index];
    pwd += char;
  }
  drawns = [];

  return pwd;
}

function getRandomIndex(collection) {
  if (collection && collection.length) {
    let random = Math.floor(Math.random() * collection.length);
    let exists = drawns.filter((f) => f === random).length;

    if (!exists) {
      drawns.push(random);
    } else {
      getRandomIndex();
    }

    return random;
  }
}

function setCopyToClipboardVisibility(visible) {
  let icons = document.getElementsByClassName("copy-to-clipboard");
  for (let i = 0; icons.length; i++) {
    if (!icons || !icons[i]) break;
    icons[i].style.visibility = visible ? "visible" : "hidden";
  }
}

function copyToClipboard(elementId) {
  let passwordToCopy = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(passwordToCopy);
}
