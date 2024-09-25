from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import Animals, Shelter

# Manually converted list of shelters using the `Shelter` model.
shelters: list[Shelter] = [
    Shelter(
        name="St. George Animal Shelter",
        address="605 Waterworks Dr, St. George, UT 84770",
        animals=Animals(
            cats=13,
            dogs=15,
        ),
    ),
    Shelter(
        name="St. George Paws",
        address="1125 W 1130 N, St. George, UT 84770",
        animals=Animals(
            cats=12,
            dogs=9,
        ),
    ),
    Shelter(
        name="Animal Rescue Team",
        address="1838 W 1020 N Ste. B, St. George, UT 84770",
        animals=Animals(
            cats=4,
            dogs=7,
        ),
    ),
    Shelter(
        name="Bailey's Rescued Animals",
        address="25 Main St, St. George, UT 84770",
        animals=Animals(
            cats=0,
            dogs=0,
        ),
    ),
    Shelter(
        name="Izzy's Home for Cute Cats",
        address="28 Main St, St. George, UT 84770",
        animals=Animals(
            cats=10,
            dogs=0,
        ),
    ),
]

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CRUD Endpoints

@app.get("/shelters", response_model=list[Shelter])
async def get_shelters():
    return shelters


@app.get("/shelters/{shelter_name}", response_model=Shelter)
async def get_shelter_by_name(shelter_name: str):
    for shelter in shelters:
        if shelter.name == shelter_name:
            return shelter
    raise HTTPException(status_code=404, detail="Shelter not found")


@app.post("/shelters", response_model=Shelter)
async def create_shelter(shelter: Shelter):
    shelters.append(shelter)
    return shelter


@app.put("/shelters/{shelter_name}", response_model=Shelter)
async def update_shelter(shelter_name: str, updated_shelter: Shelter):
    for index, shelter in enumerate(shelters):
        if shelter.name == shelter_name:
            shelters[index] = updated_shelter
            return updated_shelter
    raise HTTPException(status_code=404, detail="Shelter not found")


@app.delete("/shelters/{shelter_name}", response_model=dict)
async def delete_shelter(shelter_name: str):
    for index, shelter in enumerate(shelters):
        if shelter.name == shelter_name:
            del shelters[index]
            return {"message": "Shelter deleted"}
    raise HTTPException(status_code=404, detail="Shelter not found")
