const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    EQUIPMENT: Symbol("equipment"),
    PAIN: Symbol("pain"),
    CAR: Symbol("car"),
    GEESE: Symbol("geese"),
    GAS: Symbol("gas"),
    EMERGENCY: Symbol("emergency"),
    NEWMAN: Symbol("newman"),
    TRIAGE: Symbol("triage"),
    FEVER: Symbol("fever"),
});

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput) {
        let sReply = "";
        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply = "It's a nice day out and you decide to go out and be active. You go to your garage but you have to decide if you want to play on your SKATEBOARD, SCOOTER or BIKE. Type SKATEBOARD, SCOOTER, or BIKE.";
                this.stateCur = GameState.EQUIPMENT;
                break;
            case GameState.EQUIPMENT:
                if (sInput.toLowerCase().match("skateboard")) {
                    sReply = "You grab your skateboard and go out to your driveway. As you are skateboarding, you lose your balance and do a 360 flip landing on your arm. Your arm hurts and upon inspection looks broken. Do you CALL a friend to take you to the emergency room and risk getting COVID-19 or WAIT to see if it is just a bruise? Type CALL or WAIT.";
                    this.stateCur = GameState.PAIN;
                } else if (sInput.toLowerCase().match("bike")) {
                    sReply = "You jump on your bike and go for a long ride. As you are biking on the side of the road, a car looses control and swerves towards you. You turn your bike towards a ditch to avoid being hit by the car. You fly into the ditch and tumble down. When you try to get up you realize that your arm is broken. Do you CALL a friend to take you to the emergency room and risk getting COVID-19 or do you try to RIDE home? Type CALL or RIDE.";
                    this.stateCur = GameState.PAIN;
                } else {
                    sReply = "Oh no, your scooter is all rusty and isn't safe to use. Do you want to ride your BIKE or play on your SKATEBOARD? Type BIKE or SKATEBOARD.";
                }
                break;
            case GameState.PAIN:
                if (sInput.toLowerCase().match("wait")) {
                    sReply = "You go inside and ice your arm, but the pain only gets worse and you can't move your fingers. Do you continue to WAIT or CALL that friend? Type WAIT or CALL.";
                } else if (sInput.toLowerCase().match("ride")) {
                    sReply = "You try to ride home on your bike but with only 1 functioning hand, it takes forever. You get home but have to decide... do you WAIT or CALL a friend to take you to the emergency room? Type WAIT or CALL.";
                } else {
                    sReply = "Your friend, Kramer, arrives but neither you nor he has a mask to wear. Do you ENTER the car or GO back inside your house? Type ENTER or GO.";
                    this.stateCur = GameState.CAR;
                }
                break;
            case GameState.CAR:
                if (sInput.toLowerCase().match("enter")) {
                    sReply = "You get in the car with Kramer. He is speeding down the road to get you to the hospital as fast as he can and doesn't notice the family of Canadian Geese crossing the street. You see them at the last second, do you TURN the steering wheel for him or do you YELL to get his attention? Type TURN or YELL."
                    this.stateCur = GameState.GEESE;
                } else {
                    sReply = "That arm keeps getting worse, do you WAIT or ENTER the car? Type WAIT or ENTER.";
                }
                break;
            case GameState.GEESE:
                if (sInput.toLowerCase().match("turn")) {
                    sReply = "Quick thinking! You have managed to avoid hitting the family of geese. But oh no, Kramer looks down at the gas tank and it is almost empty. Do you CONTINUE driving or STOP at a gas station? Type CONTINUE or STOP."
                    this.stateCur = GameState.GAS;
                } else {
                    sReply = "You yell at Kramer to look out but he doesn't understand what you are trying to tell him. You need to do something quick to stop the car from hitting the geese, do you TURN the steering wheel or continue to YELL? Type TURN or YELL.";
                }
                break;
            case GameState.GAS:
                if (sInput.toLowerCase().match("stop")) {
                    sReply = "You decide to stop for gas but it is an extra 10 minute detour, on your way to the gas station the car runs out of gas. Do you STAY in the car while Kramer pushes it to the gas station or do you CALL your other friend, George, to come pick you up? Type STAY or CALL."
                } else if (sInput.toLowerCase().match("continue")) {
                    sReply = "You decide to keep driving but you run our of gas on the way to the hospital. Do you STAY in the car while Kramer pushes it to a gas station or do you CALL your other friend, George, to come pick you up? Type STAY or CALL.";
                } else if (sInput.toLowerCase().match("call")) {
                    sReply = "George doesn't answer his phone and his voice mail is full! Do you STAY in the car while Kramer pushes it, or try to call ELAINE or JERRY to come pick you up? Type STAY, ELAINE or JERRY.";
                } else if (sInput.toLowerCase().match("elaine")) {
                    sReply = "Elaine picks up the phone but reminds you that she doesn't have a car. She would have to take a cab which would take a long time. Do you STAY in the car with Kramer or call JERRY? Type STAY or JERRY.";
                } else if (sInput.toLowerCase().match("jerry")) {
                    sReply = "Jerry picks up the phone and you ask him to pick you up, he then says he will be right there and hangs up. Two seconds later he calls and asks which car you are in, at which point you realize Kramer is driving Jerry's car! Do you STAY in the car with Kramer or call a TAXI? Type STAY or TAXI.";
                } else if (sInput.toLowerCase().match("taxi")) {
                    sReply = "A taxi comes to pick you up and takes you to the hospital. When you arrive to the emergency room entrance, you see a huge crowd. Do you you RISK it and go in or go see your NEWMAN who has done a first aid course? Type RISK or NEWMAN.";
                    this.stateCur = GameState.EMERGENCY;
                } else {
                    sReply = "You arrive at the gas station and Kramer fills up the car...he asks to borrow some money for gas. You head off and 15 minutes later you arrive at the hospital emergency room entrance and see a huge crowd, do you RISK it and enter the emergency room or go to see your friend NEWMAN who has done a first aid course? Type RISK or NEWMAN.";
                    this.stateCur = GameState.EMERGENCY;
                }
                break;
            case GameState.EMERGENCY:
                if (sInput.toLowerCase().match("risk")) {
                    sReply = "You took a risk and entered the hospital, they do an assessment and tell you they need to keep you over night. Do you STAY or ask to speak with the DOCTOR? Type STAY or DOCTOR.";
                    this.stateCur = GameState.TRIAGE;
                } else if (sInput.toLowerCase().match("mary")) {
                    sReply = "Mary hospital turns out to be just as busy and also wants you to stay over night. Do you STAY or ask to speak with the DOCTOR? Type: STAY or DOCTOR.";
                    this.stateCur = GameState.TRIAGE;
                } else {
                    sReply = "Newman takes one look at your arm and passes out from the sight. After throwing some water on his face he regains consciousness. Newman was in the middle of ordering dinner, would you prefer PIZZA or BURGERS? Type: PIZZA or BURGERS.";
                    this.stateCur = GameState.NEWMAN;
                }
                break;
            case GameState.NEWMAN:
                if (sInput.toLowerCase().match("pizza")) {
                    sReply = "You have a delicious slice of Pizza but you must make a decision. Do you go BACK to the hospital or eat another slice of PIZZA? Type BACK or PIZZA.";
                } else if (sInput.toLowerCase().match("burger")) {
                    sReply = "You get a yummy burger but its hard to eat with one hand. You need to decide, do you go BACK to the hospital or try to finish eating that BURGER? Type BACK or BURGER.";
                } else {
                    sReply = "Great choice, Kramer drives you back to the hospital. The hospital is still busy, do you RISK it and go in or try to go to MARY hospital? Type MARY or RISK.";
                    this.stateCur = GameState.EMERGENCY;
                }
                break;
            case GameState.TRIAGE:
                if (sInput.toLowerCase().match("stay")) {
                    sReply = "Turns out your arm was badly broken and staying overnight was a good idea. But you head home and a few days later you start getting a fever. Do you go BACK to the hospital, CALL TeleHealth or WAIT it out? Type BACK, CALL or WAIT.";
                    this.stateCur = GameState.FEVER;
                } else {
                    sReply = "The Doctor tells you your arm doesn't look good and you should really consider staying over night. Do you STAY?";
                }
                break;
            case GameState.FEVER:
                if (sInput.toLowerCase().match("back")) {
                    sReply = "You decide to head back to the hospital. They tell you that unless you are in a life threatening condition, you should head to the testing CENTER or go home and WAIT. Type CENTER or WAIT.";
                } else if (sInput.toLowerCase().match("call")) {
                    sReply = "You call TeleHealth and after a lot of questions, they conclude that you should either WAIT to see how your symptoms progress or go to a testing CENTER. Type CENTER or WAIT.";
                } else if (sInput.toLowerCase().match("CENTER")) {
                    sReply = "You head over to the testing center where they do a biopsy. You head home and in 3 days get the results, negative! You are relieved and avoid your Skateboard and bike for the rest of the summer.";
                    this.stateCur = GameState.WELCOMING;
                } else {
                    sReply = "You decide to wait it out and within a day the fever is gone and you have no other symptoms. You self isolate for 14 days just in case and then enjoy the rest of your summer while avoiding your bike and skateboard.";
                    this.stateCur = GameState.WELCOMING;
                }
                break;
        }
        return ([sReply]);
    }
}
