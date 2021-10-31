### To run
Install dependencies
`npm install`

Run Via npm
Run the CLI


`npm run read_sensor_data -- --box_id=Box-A1 --from='2021-04-07 00:00:00' --to='2021-04-07 00:09:00'`

With YAML config


`npm run read_sensor_data -- --box_id=Box-A1 --from='2021-04-07 00:00:00' --to='2021-04-07 00:09:00' -conf conf.yaml`


Aggregate


`npm run read_sensor_data -- --box_id=Box-A1 --from='2021-04-07 00:00:00' --to='2021-04-07 00:09:00' --aggregate=true -conf conf.yaml`


Server


`npm run server`


Or via Node

Build the typescript


`npm run build`

Then:

Run the CLI


`node build/src/read_sensor_data --box_id=Box-A1 --from='2021-04-07 00:00:00' --to='2021-04-07 00:09:00'`


With YAML config


`node build/src/read_sensor_data --box_id=Box-A1 --from='2021-04-07 00:00:00' --to='2021-04-07 00:09:00' -conf conf.yaml`


Aggregate


`node build/src/read_sensor_data --box_id=Box-A1 --from='2021-04-07 00:00:00' --to='2021-04-07 00:09:00' --aggregate=true -conf conf.yaml`


Run the server


`node build/src/server`


### Approach
I've attempted to keep the business logic and display logic separate.
We have:
src/domain/readings-domain - which contains the SQL to query to database
src/app - which contains the express app
src/cli - which has the cli program
src/read_sensor_data which sets up the cli and calls it
src/server which setups the server and calls is
config - handled the loading of the config via .env or yaml

I've used dependency injection to keep each part of the application isolated which reduces dependencies and coupling between concerns. I could probably do this in a nicer way eg having a catch all domain/middleware handler that handles the setting up and passing in but for now what I have is pretty straight forward.

I've rounded the average reading to 2 decimal places.

### Testing
The testing is pretty light, this is mainly as I've not done any DB level testing. I'd normally test the SQL and run any application level testing against a test database populated using factories. I've not done this as the DB is not in my control, I'm not overly familiar with the data nor in the time I had did I think it was worth spinning up a docker container, creating migrations etc

### Typescript
I've not worked on a full TS project nor have I set one up so I'm not 100% confident with how I've handled the static typing and I'm sure there are areas for improvement here.
