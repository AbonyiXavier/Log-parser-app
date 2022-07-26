export const successfulLogField =
  '2020-07-14T12:24:24z - error - {"transactionId": "30d4981f-1cf4-40ca-8481-c441e9c5165cd", "details": "Invalid amount"}';

export const INVALID_LOG_FIELDS = {
  no_log_level:
    '2020-07-14T12:24:24z  {"transactionId": "30d4981f-1cf4-40ca-8481-c441e9c5165cd", "details": "Invalid amount"}',
  no_time_stamp:
    '- error -  {"transactionId": "30d4981f-1cf4-40ca-8481-c441e9c5165cd", "details": "Invalid amount"}',
  no_details:
    '2020-07-14T12:24:24z - error - {"transactionId": "30d4981f-1cf4-40ca-8481-c441e9c5165cd"',
  no_json: '2020-07-14T12:24:24z - error -',
  empty_string: '',
};


export const VALID_LOG_ENTRY = {
    warn: [ 
        {"timestamp":1594816108000, "transactionId":"30d4981f-1cf4-40ca-8481-c441e9c5165ce","loglevel":"warn", "err":"Invalid amount 2"}
    ],
    error: [ 
        {"timestamp":1594816108000, "transactionId":"30d4981f-1cf4-40ca-8481-c441e9c5165ce","loglevel":"error", "err":"Invalid amount 2"},
        {"timestamp":1594816108000, "transactionId":"30d4981f-1cf4-40ca-8481-c441e9c5165ce","loglevel":"error", "err":"Invalid amount 2"},
        {"timestamp":1594816108000, "transactionId":"30d4981f-1cf4-40ca-8481-c441e9c5165ce","loglevel":"error", "err":"Invalid amount 2"}
    ],
}
