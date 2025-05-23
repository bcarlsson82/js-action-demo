const core = require('@actions/core');
const github = require('@actions/github');

try {
    // --- Configuration from Environment Variables ---
    // Get the user's name from an environment variable.
    // In your workflow, you would set this using:
    // env:
    //   USER_NAME: "YourName"
    const userName = process.env.USER_NAME;

    // Get the desired greeting format from an environment variable.
    // This format can include placeholders {name} and {time}.
    // Example: "Hello {name}, the time is {time}." or "Greetings, {name}!"
    // If not set, a default format will be used.
    // env:
    //   GREETING_FORMAT: "Custom greeting for {name} at {time}!"
    const greetingFormat = process.env.GREETING_FORMAT || "Hello {name}!"; // Default format

    // --- Input Validation ---
    if (!userName) {
        // If USER_NAME is not set, fail the action with a custom message.
        core.setFailed("Custom Error: The USER_NAME environment variable is required but was not provided. Please set it in your workflow.");
        return; // Stop execution
    }

    // --- Logic ---
    const currentTime = new Date().toTimeString();

    // Construct the greeting message by replacing placeholders.
    let greetingMessage = greetingFormat.replace('{name}', userName);
    greetingMessage = greetingMessage.replace('{time}', currentTime); // Replace {time} if present in the format

    // Log the constructed greeting message.
    console.log(greetingMessage);

    // Set the greeting message as an output variable for other steps.
    core.setOutput("greeting", greetingMessage);

    // Set the current time as an output variable (as in the original script).
    core.setOutput("time", currentTime);

    // Get the JSON webhook payload for the event that triggered the workflow.
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

} catch (error) {
    // If any other error occurs, fail the action with the error message.
    core.setFailed(`Action failed with error: ${error.message}`);
}
