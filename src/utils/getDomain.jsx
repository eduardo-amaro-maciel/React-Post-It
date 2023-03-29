function getDomain() {
    const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/';
    return url
}

export default getDomain