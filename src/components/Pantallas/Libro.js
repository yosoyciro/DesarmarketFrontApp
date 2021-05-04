import { Button, Card, Container, Dialog, DialogContent, DialogTitle, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from '../../theme/useStyles';
import { agregarLibro, editarLibro, eliminarLibro, listarLibros, obtenerLibroKey } from '../Data/Libros';

const clearLibro = {
    categoria: 'Programacion',
    titulo: '',
    autor: ''
}

const Libro = () => {
    const [libro, setLibro] = useState({
        categoria: 'Programacion',
        titulo: '',
        autor: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLibro(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const guardarData = () => {
        //console.log("Mi datos son " + JSON.stringify(libro));
        agregarLibro(libro);
        setLibro(clearLibro);
    };

    const [librosArray, setLibrosArray] = useState([])

    const listarDataLibros = () => {
        const data = listarLibros();
        setLibrosArray(data);
    }

    useEffect(() => {
       listarDataLibros();
    }, [librosArray.length])

    const abrirDialog = (key) => {        
        setOpen(true);
        const dataLibroKey = obtenerLibroKey(key);
        setLibroEdita({
            key: dataLibroKey.key,
            categoriaE: dataLibroKey.categoria,
            tituloE: dataLibroKey.titulo,
            autorE: dataLibroKey.autor,
        })
        //console.log("mi boton editar");
    };

    const eliminarData = (data) => {
        const listaNuevaLibros = eliminarLibro(data);
        setLibrosArray(listaNuevaLibros);
        console.log("boton eliminar");
    };

    const [libroEdita, setLibroEdita] = useState({
        key: 0,
        categoriaE: '',
        tituloE: '',
        autorE: ''
    });

    const handleChangeEdita  = (e) => {
        const {name, value} = e.target;
        setLibroEdita(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const [open, setOpen] = useState(false);

    const cerrarDialog = () => {
        setOpen(false);
    }; 

    

    const editarData = (e) => {
        const nuevaData = editarLibro(libroEdita);
        cerrarDialog();
        console.log("boton edita ", nuevaData)
    }

    const classes = useStyles();

    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item lg={7} md={8}>
                    <Card className={classes.card} align="center">
                        <Typography variant="h4">
                            Libros
                        </Typography>
                        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField
                                    select
                                    label="Categoria"
                                    variant="outlined"
                                    fullWidth
                                    align="left"
                                    name="categoria"
                                    value={libro.categoria}
                                    onChange={handleChange}
                                    >
                                        <MenuItem value="Programacion">Programacion</MenuItem>
                                        <MenuItem value="Cocina">Cocina</MenuItem>
                                        <MenuItem value="Mecanica">Mecanica</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="Título"
                                        variant="outlined"
                                        fullWidth
                                        name="titulo"
                                        value={libro.titulo}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField
                                        label="Autor"
                                        variant="outlined"
                                        fullWidth
                                        name="autor"
                                        value={libro.autor}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    type="submit"
                                    onClick={guardarData}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer component={Paper} className={classes.containermt}> 
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Autor</TableCell>
                            <TableCell align="center" colSpan={2}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { librosArray.map((libroObj) => (
                            <TableRow key={libroObj.key}>
                                <TableCell>{libroObj.categoria}</TableCell>
                                <TableCell>{libroObj.titulo}</TableCell>
                                <TableCell>{libroObj.autor}</TableCell>
                                <TableCell>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => abrirDialog(libroObj.key)}
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => eliminarData(libroObj)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={cerrarDialog} maxWidth="xs" fullWidth align="center">
                <DialogTitle>Editar libro</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <TextField
                            className={classes.gridmb}
                            select
                            label="Categoria"
                            variant="outlined"
                            fullWidth
                            align="left"
                            name="categoriaE"
                            value={libroEdita.categoriaE}
                            onChange={handleChangeEdita}
                        >
                            <MenuItem value="Programacion">Programacion</MenuItem>
                            <MenuItem value="Cocina">Cocina</MenuItem>
                            <MenuItem value="Mecanica">Mecanica</MenuItem>
                        </TextField>
                        <TextField
                            className={classes.gridmb}
                            label="Título"
                            variant="outlined"
                            fullWidth
                            name="tituloE"
                            value={libroEdita.tituloE}
                            onChange={handleChangeEdita}
                        />
                        <TextField
                            className={classes.gridmb}
                            label="Autor"
                            variant="outlined"
                            fullWidth
                            name="autorE"
                            value={libroEdita.autorE}
                            onChange={handleChangeEdita}
                        />
                        <Button
                            className={classes.gridmb}
                            variant="contained"
                            fullWidth
                            color="primary"
                            type="submit"
                            onClick={editarData}
                        >
                            Guardar
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Libro;