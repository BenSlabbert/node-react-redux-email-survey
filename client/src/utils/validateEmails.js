const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * Returns a list of invalid emails
 * Takes a csv string of emails
 * @param emails
 */
export default ( emails ) => {
    if (!emails) return;
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => email !== '' && emailRegex.test(email) === false);

    if (invalidEmails.length) return `These emails are invalid: ${invalidEmails}`;
}
