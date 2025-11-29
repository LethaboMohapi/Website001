const input = document.querySelector('._input_field');
const inputIcon = document.querySelector('._input_icon');
const passwordStrength = document.querySelector('._progress-bar');

const passwordLabel = document.getElementById('strength-label');
const eyeHide = document.getElementById('eye-icon-hidden');
const eyeShow = document.getElementById('eye-icon-shown');

inputIcon.addEventListener("click", (e) => {
    e.preventDefault();

    const isPassword = input.getAttribute("type") === "password";

    input.setAttribute(
        'type',
        isPassword ? 'text' : 'password'
    );

    console.log(isPassword);

    if (isPassword) {
        eyeShow.style.display = 'none';
        eyeHide.style.display = 'block';
    } else {
        eyeShow.style.display = 'block';
        eyeHide.style.display = 'none';
    }
});

input.addEventListener("keyup", function() {
    let pass = document.getElementById("password").value;
    checkStrength(pass);
});

// rule set
const rules = [
    {
        name: 'low-upper-case',
        pattern: /([a-z].*[A-Z])|([A-Z].*[a-z])/
    },
    // more rules
];

const checkRule = (
    password,
    strength,
    { pattern, name }
) => {
    if (password.match(pattern)) {
        strength += 1;
        const img = document.querySelector(`.${name} img`);
        img.src = 'assets/check.svg';
    } else {
        const img = document.querySelector(`.${name} img`);
        img.src = 'assets/uncheck.svg';
    }

    return strength;
};

// password strength progress rules
const passwordStrengthProgressRule = [
    {
        maxStrength: 1,
        width: '10%',
        class: 'danger',
        label: 'Weak'
    },
    // more rules
];

const makeProgressBar = (strength) => {
    const rule = passwordStrengthProgressRule.find(r => strength <= r.maxStrength);

    if (rule) {
        passwordStrength.className = 'progress-bar ' + rule.class;
        passwordStrength.style.width = rule.width;

        passwordLabel.innerText = rule.label;
        passwordLabel.className = 'label ' + rule.class;
    }
};

function checkStrength(password) {
    let strength = 0;

    rules.forEach(rule => {
        strength = checkRule(
            password,
            strength,
            rule
        );
    });

    makeProgressBar(strength);
}
