const backupTopics = [
    {
        day: 1,
        category: "Electrical Fundamentals",
        title: "Electricity, Voltage, Current and Resistance",

        simple_explanation: `
Electricity is the movement of electric charge.

Voltage pushes electricity.

Current is the flow of electric charge.

Resistance opposes the flow of current.
        `,

        real_life_example: `
Think about water in a pipe:

Voltage = water pressure

Current = water flow

Resistance = narrow pipe
        `,

        symbol_unit: `
Voltage = V (Volt)

Current = I (Ampere)

Resistance = R (Ohm)
        `,

        important_points: `
• Voltage pushes charge

• Current is the flow of charge

• Resistance limits current

• Ohm's Law: V = I × R
        `,

        embedded_connection: `
STM32 microcontrollers commonly operate using 3.3V.

Embedded engineers use voltage, current and resistance when designing circuits.
        `,

        formula: `
V = I × R

I = V / R

R = V / I
        `,

        code_example: ""
    },

    {
        day: 2,
        category: "Electrical Fundamentals",
        title: "AC, DC and Basic Circuits",

        simple_explanation: `
AC changes direction repeatedly.

DC flows mainly in one direction.

Microcontrollers normally operate using DC power.
        `,

        real_life_example: `
Wall socket = AC

Battery = DC
        `,

        symbol_unit: `
AC = Alternating Current

DC = Direct Current

Germany mains frequency = 50 Hz
        `,

        important_points: `
• AC changes direction

• DC flows in one direction

• Embedded systems usually need regulated DC power

• Ground is the reference point in many circuits
        `,

        embedded_connection: `
A power supply converts mains AC into suitable DC voltages such as 5V or 3.3V for electronics.
        `,

        formula: "",

        code_example: ""
    },

    {
        day: 3,
        category: "Electronic Components",
        title: "Resistors, Capacitors, Diodes and Transistors",

        simple_explanation: `
Electronic components perform different jobs.

A resistor limits current.

A capacitor stores electrical charge temporarily.

A diode allows current mainly in one direction.

A transistor can control a larger current using a smaller control signal.
        `,

        real_life_example: `
Resistor = water valve

Capacitor = small water tank

Diode = one-way valve

Transistor = electronically controlled switch
        `,

        symbol_unit: `
Resistance = Ω

Capacitance = F

Inductance = H
        `,

        important_points: `
• Resistors protect components

• Capacitors help stabilize power

• Diodes control current direction

• Transistors can switch loads
        `,

        embedded_connection: `
A microcontroller GPIO pin can control a transistor or MOSFET to operate a motor, relay or other load.
        `,

        formula: "",

        code_example: ""
    }
];
