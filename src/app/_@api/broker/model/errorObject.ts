/**
 * Broker
 * Broker API
 *
 * The version of the OpenAPI document: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * The root of the ErrorObject type\'s schema.
 */
export interface ErrorObject { 
    /**
     * Unique identifier for this incident
     */
    id?: string;
    /**
     * The application error code 
     */
    code: ErrorObject.CodeEnum;
    /**
     * A human readable detailed description of the error 
     */
    detail?: object;
    /**
     * Error message
     */
    message?: string;
}
export namespace ErrorObject {
    export type CodeEnum = 'VALIDATION_ERRORS' | 'RECORD_NOT_FOUND' | 'METHOD_NOT_ALLOWED' | 'EXCEEDED_MAX_GUESTS';
    export const CodeEnum = {
        VALIDATIONERRORS: 'VALIDATION_ERRORS' as CodeEnum,
        RECORDNOTFOUND: 'RECORD_NOT_FOUND' as CodeEnum,
        METHODNOTALLOWED: 'METHOD_NOT_ALLOWED' as CodeEnum,
        EXCEEDEDMAXGUESTS: 'EXCEEDED_MAX_GUESTS' as CodeEnum
    };
}


