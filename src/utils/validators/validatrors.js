

export const validators = {
    required: (val) => {
        return val ? undefined : "Field is required";
    },
    minLen: (minLen) => (val) => {
        return !val || val.length<minLen ? `Min length is ${minLen}` : undefined;
    }
}