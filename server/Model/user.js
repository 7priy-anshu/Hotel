import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: {type: string , requird: true},
    username: {type: string , requird: true},
    email: {type: string , requird: true},
    image: {type: string , requird: true},
    role: {type: string , enum : ["user" , "hotelOwner"] , default: "user" },
      recentSearchCities : [{type: string , requird: true}],
},{timetamps: true}
);

const User = mongoose.model("user", userSchema );

export default User;