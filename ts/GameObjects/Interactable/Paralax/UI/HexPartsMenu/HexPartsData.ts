/** Return a random part of hex (used for ) */
export function getRandomHexPart(): HexParts
{
    return Math.floor(Math.random() * 15) + 1;

}

/** All the sub parts of hex residing in the body parts */
export enum HexParts
{
    none = 0,

    /** Head parts */
    head_chip = 1,
    head_wires = 2,
    head_metal = 3,
    head_screws = 4,

    /** Left arm parts */
    left_arm_screws = 5,
    left_arm_metal = 6,
    left_arm_wires = 7,

    /** Right arm parts */
    right_arm_screws = 8,
    right_arm_metal = 9,
    right_arm_wires = 10,

    /** Torso parts */
    torso_hearth = 11,
    torso_metal = 12,
    torso_screws = 13,
    torso_wires = 14,

    /** Booster parts */
    booster_battery = 15,
    booster_metal = 16,
    booster_screws = 17,
    booster_wires = 18

}

/** All the body parts of hex */
export enum HexBodyParts
{
    none = 0,

    head = 1,

    neck = 2,

    leftArm = 3,
    rightArm = 4,

    torso = 5,

    booster = 6
}

/** A sub part of hex */
export interface IHexPart
{
    frameName: string;
    collected: boolean;
}

/** A body part of hex */
export interface IHexBodyPart
{
    name: string;
    frameName: string;
    subParts: IHexPartsCollection;
}

/** A collection of sub parts of hex */
export interface IHexPartsCollection
{
    [key: number]: IHexPart;
}

/** A collection of body parts of hex */
export interface IHexBodyPartsCollection
{
    [key: number]: IHexBodyPart;
}

/** The default hex parts data, collecting all the values  */
export let defaultHexPartsData: IHexBodyPartsCollection = {

    /** Head */
    [HexBodyParts.head]: {
        name: 'Head',
        frameName: 'Head',
        subParts: {

            [HexParts.head_chip]: {
                frameName: 'Chip',
                collected: false
            },
            [HexParts.head_wires]: {
                frameName: 'Wires',
                collected: false
            },
            [HexParts.head_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.head_screws]: {
                frameName: 'Screws',
                collected: false
            }

        }
    },

    /** Left arm */
    [HexBodyParts.leftArm]: {
        name: 'Left arm',
        frameName: 'Left_arm',
        subParts: {

            [HexParts.left_arm_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.left_arm_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.left_arm_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Right arm */
    [HexBodyParts.rightArm]: {
        name: 'Right arm',
        frameName: 'Right_arm',
        subParts: {

            [HexParts.right_arm_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.right_arm_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.right_arm_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Body */
    [HexBodyParts.torso]: {
        name: 'Torso',
        frameName: 'Torso',
        subParts: {

            [HexParts.torso_hearth]: {
                frameName: 'Hearth',
                collected: false
            },
            [HexParts.torso_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.torso_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.torso_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Booster */
    [HexBodyParts.booster]: {
        name: 'Booster',
        frameName: 'Booster',
        subParts: {

            [HexParts.booster_battery]: {
                frameName: 'Battery',
                collected: false
            },
            [HexParts.booster_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.booster_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.booster_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    }

};
