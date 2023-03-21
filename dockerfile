FROM node:19.4.0-alpine

# Create a user 'node' with home folder
RUN adduser -D app

# Set the working directory to /home/node/app
WORKDIR /home/app

# Copy the current directory contents into the container at /home/app
COPY . /home/app

# Install any needed packages specified in package.json
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run app.js when the container launches
ENTRYPOINT [ "npm" ]
CMD ["start"]