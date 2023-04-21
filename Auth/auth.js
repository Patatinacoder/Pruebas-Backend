import passport from "passport";

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Has iniciado sesión exitosamente.' });
});
