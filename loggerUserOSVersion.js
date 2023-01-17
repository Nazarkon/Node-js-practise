const os = require('os');

const OSInformation = () => {
    const UserOSInformation = {
        'Home Dir': os.homedir(),
        'Host name': os.hostname(),
        'Platform': os.platform(),
        'Temporary Dir': os.tmpdir(),
        'OS Type': os.type(),
        'Kernel Version:': os.version()
    };

    console.table(UserOSInformation);
    return UserOSInformation;
}

module.exports = {
    OSInformation,
}