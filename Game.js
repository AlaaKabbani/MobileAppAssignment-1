const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    PAIN: Symbol("pain"),
    CAR: Symbol("car"),
    EMERGENCY: Symbol("emergency"),
    TRIANGLE: Symbol("triage"),
});

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput) {
        let sReply = "";
        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply = "You are out skateboarding on your driveway. Suddenly you lose your balance and do a 360 flip landing on your arm. Your arm hurts and upon inspection looks broken. Do you CALL a friend to take you to the emergency room and risk getting COVID-19 or WAIT to see if it is just a bruise?";
                this.stateCur = GameState.PAIN;
                break;
            case GameState.PAIN:
                if (sInput.toLowerCase().match("wait")) {
                    sReply = "You go inside and ice your arm, but the pain only gets worse and you can't move your fingers. Do you continue to WAIT or CALL that friend?";
                } else {
                    sReply = "Your friend arrives but neither you nor he has a mask to wear. Do you ENTER the car or GO back inside your house?";
                    this.stateCur = GameState.CAR;
                }
                break;
            case GameState.CAR:
                if (sInput.toLowerCase().match("enter")) {
                    sReply = "You enter the car and 15 minutes later you arrive at the hospital emergency room entrance and see a huge crowd, do you RISK it and enter the emergency room or go to see your friend BOB who has done a first aid course?"
                    this.stateCur = GameState.EMERGENCY;
                } else {
                    sReply = "That arm keeps getting worse, do you WAIT or CALL your friend?";
                    this.stateCur = GameState.PAIN;
                }
                break;
            case GameState.EMERGENCY:
                if (sInput.toLowerCase().match("risk")) {
                    sReply = "You took a risk and entered the hospital, they do an assessment and tell you they need to keep you over night. Do you STAY or ask to speak with the DOCTOR?";
                    this.stateCur = GameState.TRIAGE;
                } else if (sInput.toLowerCase().match("mary")) {
                    sReply = "Mary hospital turns out to be just as busy and also wants you to stay over night. Do you STAY or ask to speak with the DOCTOR?";
                    this.stateCur = GameState.TRIAGE;
                } else {
                    sReply = "Bob takes one look at your arm and passes out from the sight. That was a bad idea, do you go back to the hospital and RISK it or try to go to another hospital called MARY Hospital?";
                }
                break;
            case GameState.TRIAGE:
                if (sInput.toLowerCase().match("stay")) {
                    sReply = "Turns out your arm was badly broken and staying overnight was a good idea. The hospital takes all precautions and you do not catch COVID-19. Great Job!";
                    this.stateCur = GameState.WELCOMING;
                } else {
                    sReply = "The Doctor tells you your arm doesn't look good and you should really consider staying them night. Do you STAY?";
                }
        }
        return ([sReply]);
    }
}