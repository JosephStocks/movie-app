const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const checkedSiblingPlugin = plugin(function ({ addVariant, e }) {
    addVariant("checked-sibling", ({ container }) => {
        container.walkRules((rule) => {
            rule.selector = `:checked + .checked-sibling\\:${rule.selector.slice(
                1
            )}`;
        });
    });
});

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            blueGray: colors.blueGray,
            coolGray: colors.coolGray,
            gray: colors.gray,
            trueGray: colors.trueGray,
            warmGray: colors.warmGray,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            lightBlue: colors.lightBlue,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
        },
        extend: {
            width: {
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
                "2xl": "42rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "5xl": "64rem",
                "6xl": "72rem",
                "7xl": "80rem",
            },
            boxShadow: {
                brighten: "inset 0 0 200px 200px rgba(255, 255, 255, 0.2)",
            },
            // fontFamily: {
            //     sans: `Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
            // },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["checked", "checked-sibling"],
            borderColor: ["checked", "checked-sibling"],
            textDecoration: ["checked", "checked-sibling"],
            cursor: ["group-hover", "hover", "focus"],
            outline: ["focus"],
            transitionProperty: ["hover", "focus"],
        },
        textOpacity: [
            "responsive",
            "group-hover",
            "can-hover",
            "no-hover",
            "focus-within",
            "hover",
            "focus",
            "checked",
            "checked-sibling",
        ],
        opacity: [
            "responsive",
            "group-hover",
            "can-hover",
            "no-hover",
            "focus-within",
            "hover",
            "focus",
            "checked",
            "checked-sibling",
        ],
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        checkedSiblingPlugin,
        require("tailwindcss-interaction-variants"),
    ],
};
