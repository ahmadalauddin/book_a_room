const supertest = require('supertest');
import dataSource from "../src/init/datasource";
import app from '../src/app';
import eventEmitter from "../src/utils/event"
import { EVENT } from "../src/utils/constants"
import { Room, Booking, User } from "../src/models";

const request = supertest(app);
const roomTestData = [
    {
        id: 1,
        name: "Room A"
    },
    {
        id: 2,
        name: "Room B"
    }];

const userTestData = [
    {
        id: 1,
        name: "John Doe"
    },
    {
        id: 2,
        name: "Mark Jason"
    }];

describe("Test Server status", () => {
    test("Api should return success message with code 200", async () => {
        const res = await request.get('/ping');
        expect(res.status).toEqual(200);
    })
});

describe("Test endpoints", ()=>{
    beforeAll((done) => {

        //checking db connection
        eventEmitter.on(EVENT.DB_CONNECTION, async () => {
            await dataSource.getRepository(Booking).delete({});
            await dataSource.getRepository(Room).delete({});
            await dataSource.getRepository(User).delete({});
            
            //creating test data in the db
            const roomRepository = dataSource.getRepository(Room);
            await roomRepository.save(roomTestData);

            const userRepository = dataSource.getRepository(User);
            await userRepository.save(userTestData);
            done();
        });
    });

    describe("/rooms endpoints", () => {
        beforeAll(async() => {
    
        });
    
        describe("-GET", () => {

            const date = "2022-06-01";
            const roomId = 1;
            
            test("Endpoint should return rooms array with test length record  with status code 200", async () => {
                const res = await request.get("/rooms");
                expect(res.status).toEqual(200);
                expect(res.body.length).toEqual(roomTestData.length);
            })

            test("Endpoint should return status with error code 404 if date is not provided", async () => {
                const res = await request.get(`/rooms/available/`);
                expect(res.status).toEqual(404);
            })

            test("Endpoint should return status with error code 422 if date provided is not in the right format", async () => {
                const res = await request.get(`/rooms/available/06-01-2022`);
                expect(res.status).toEqual(422);
            })

            test("Endpoint should return all available rooms on the given date", async () => {
                const res = await request.get(`/rooms/available/${date}`);
                expect(res.status).toEqual(200);
                expect(Array.isArray(res.body)).toBe(true);
            })

            test("Endpoint should not return an unavailabe room on the given date in results", async () => {
                await request.post("/bookings").send({
                    roomId: roomId,
                    userId: 1,
                    date: '2022-06-01'
                });

                const res = await request.get(`/rooms/available/${date}`);
                expect(res.body).not.toEqual(expect.arrayContaining([expect.objectContaining({id: roomId})]));
            })
        });
    
    });
    
    describe("/users endpoints", () => {   
        beforeAll(async() => {
    
        });
    
        describe("-GET", () => {
            test("Endpoint should return users array with test length record  with status code 200", async () => {
                const res = await request.get("/users");
                expect(res.status).toEqual(200);
                expect(res.body.length).toEqual(userTestData.length);
            })
        });
    
    });

    describe("/bookings endpoints", () => {   
        beforeEach(async() => {
            await dataSource.getRepository(Booking).delete({});
        });
        
        describe("-POST", () => {
            
            test("Endpoint should return an error with status code 422 if room id is not provided", async () => {
                const res = await request.post("/bookings").send({
                    userId: 1,
                    date: '2022-06-01'
                });
                expect(res.status).toEqual(422);
            });

            test("Endpoint should return an error with status code 422 if user id is not provided", async () => {
                const res = await request.post("/bookings").send({
                    roomId: 1,
                    date: '2022-06-01'
                });
                expect(res.status).toEqual(422);
            });

            test("Endpoint should return an error with status code 422 if date is not provided", async () => {
                const res = await request.post("/bookings").send({
                    userId: 1,
                    roomId: 1
                });
                expect(res.status).toEqual(422);
            });

            test("Endpoint should return an error with status code 422 if date is not provided in the right format (YYYY-MM-DD)", async () => {
                const res = await request.post("/bookings").send({
                    roomId: 1,
                    userId: 1,
                    date: '06-01-2022'
                });
                expect(res.status).toEqual(422);
            });

            test("Endpoint should create a booking on provided date and return status code 200", async () => {
                const res = await request.post("/bookings").send({
                    roomId: 1,
                    userId: 1,
                    date: '2022-06-01'
                });
                expect(res.status).toEqual(200);
            });

            test("Endpoint should return a error code 409 if booking on specific date exists", async () => {
                await request.post("/bookings").send({
                    roomId: 2,
                    userId: 2,
                    date: '2022-06-01'
                });

                const res = await request.post("/bookings").send({
                    roomId: 2,
                    userId: 2,
                    date: '2022-06-01'
                });

                expect(res.status).toEqual(409);
            });
        });
    
    });
})

