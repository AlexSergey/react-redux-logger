export const sendLog = data => {
    return new Promise((resolve, reject) => {
        // Send stack to elastic
        console.log(data);
        resolve();
    });
};
