const mobileDetector = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iPhone: function() {
        return navigator.userAgent.match(/iPhone/i);
    },
    iPad: function() {
        return navigator.userAgent.match(/iPad/i);
    },
    iPod: function() {
        return navigator.userAgent.match(/iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    isMobile: function() {
        return typeof global.orientation !== 'undefined';
    }
};

const getMobileName = () => {
    if (mobileDetector.isMobile()) {
        if (mobileDetector.Windows()) {
            return 'Windows Phone';
        } else if (mobileDetector.Opera()) {
            return 'Opera Mini';
        } else if (mobileDetector.iPhone()) {
            return 'iPhone';
        } else if (mobileDetector.iPad()) {
            return 'iPad';
        } else if (mobileDetector.iPod()) {
            return 'iPod';
        } else if (mobileDetector.BlackBerry()) {
            return 'BlackBerry';
        } else if (mobileDetector.Android()) {
            return 'Android';
        }
        return 'Unknown';
    }
};

export default mobileDetector;

export { getMobileName };
