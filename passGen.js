document.getElementById('generate-btn').addEventListener('click', function() {
    var length = document.getElementById('length').value;
    var uppercase = document.getElementById('uppercase').checked;
    var lowercase = document.getElementById('lowercase').checked;
    var numbers = document.getElementById('numbers').checked;
    var special = document.getElementById('special').checked;

    var charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    var password = '';
    for (var i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById('output').innerText = password;

    // Show estimated crack time
    var strength = calculatePasswordStrength(password);
    var crackTime = estimateCrackTime(strength);
    document.getElementById('crack-time').innerText = 'Estimated time to crack: ' + crackTime;
});

function calculatePasswordStrength(password) {
    var charsetSize = 0;
    if (document.getElementById('uppercase').checked) charsetSize += 26;
    if (document.getElementById('lowercase').checked) charsetSize += 26;
    if (document.getElementById('numbers').checked) charsetSize += 10;
    if (document.getElementById('special').checked) charsetSize += 32;

    var entropy = Math.log2(Math.pow(charsetSize, password.length));

    return entropy;
}

function estimateCrackTime(strength) {
    var timeEstimates = {
        'Very Weak': 'Instant',
        'Weak': 'Seconds to minutes',
        'Moderate': 'Minutes to hours',
        'Strong': 'Days to years',
        'Very Strong': 'Decades to centuries'
    };

    if (strength < 20) {
        return timeEstimates['Very Weak'];
    } else if (strength < 40) {
        return timeEstimates['Weak'];
    } else if (strength < 60) {
        return timeEstimates['Moderate'];
    } else if (strength < 80) {
        return timeEstimates['Strong'];
    } else {
        return timeEstimates['Very Strong'];
    }
}

document.getElementById('copy-btn').addEventListener('click', function() {
    var output = document.getElementById('output');
    var range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Password copied to clipboard');
});

