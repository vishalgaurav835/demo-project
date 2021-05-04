const RESPONSE_STATUS = { SUCCESS: 'success', ERROR: 'error', CONNECTED: 'connected' };

const HTTP_CODES = {
    OK : 200,
    CREATED : 201,
    ACCEPTED : 202,
    MULTIPLE_CHOICES : 300, 
    MOVED_PERMANENTLY : 301,
    FOUND : 302,
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,
    NOT_FOUND : 404,
    NOT_ACCEPTABLE : 406,
    REQUEST_TIMEOUT : 408
}

const FILTER_SEARCH_KEYS = {
    STATUS : 'status',
    DELETED : 'deleted',
}


module.exports = {
    RESPONSE_STATUS, HTTP_CODES, FILTER_SEARCH_KEYS 
}
