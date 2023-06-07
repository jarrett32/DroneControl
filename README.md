# Drone Companion App Documentation

The Drone Companion App is an iOS application designed to work in tandem with the Drone Server to enable you to control a drone remotely using your iPhone. The app allows you to send custom commands to the drone, giving you the flexibility and control needed for a diverse range of drone operations.

## Setup and Usage Guidelines

1. **Clone and Download**: Start by cloning the companion app repository to your local machine using the following git command:

```bash
git clone https://github.com/jarrett32/DroneControl.git
```
2. **Build and Install**: To build and install the app on your iPhone, you need to have Xcode installed on your Mac. Open the `.xcodeproj` or `.xcworkspace` file in Xcode, then connect your iPhone to your Mac. In the Xcode toolbar, select your iPhone from the device dropdown menu, then press the `Run` button (or use the shortcut `Cmd + R`). Xcode will build the project and automatically install the app on your iPhone.

3. **Server Setup**: If you haven't already, follow the guidelines for setting up the drone server, available at [this repo](https://github.com/jarrett32/DroneServer). This server will be the communication interface between the companion app and the drone.

4. **Start Sending Commands**: With the server running and the app installed, you're ready to start controlling your drone. Launch the app on your iPhone and enter the IP address of the server. Now you can start sending custom commands to the drone.

Remember that the drone should be within the range of your iPhone's hotspot and the server should be running throughout. Enjoy your flight!