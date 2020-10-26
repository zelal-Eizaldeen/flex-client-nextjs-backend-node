const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Program = require('../models/program');
const User = require('../models/user');

const getProgramById = async (req, res, next) => {
  const programId = req.params.pid;
  let program;
  try {
    program = await Program.findById(programId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a program.',
      500
    );
    return next(error);
  }
  if (!program) {
    const error = new HttpError(
      'Could not find program for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ program: program.toObject({ getters: true }) });
};

const getProgramsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPrograms;
  try {
    userWithPrograms = await User.findById(userId).populate('programs');
  } catch (err) {
    const error = new HttpError(
      'Fetching programs failed, please try again later.',
      500
    );
    return next(error);
  }
  if(userWithPrograms.programs.length === 0) {
    return next(
      new HttpError('No Programs, Try to add new program', 404)
    );
  }

  if (!userWithPrograms || userWithPrograms.programs.length === 0) {
    return next(
      new HttpError('Could not find programs for the provided user id.', 404)
    );
  }

  res.json({
    programs: userWithPrograms.programs.map(program =>
      program.toObject({ getters: true })
    )
  });
};

const createProgram = async (req, res, next) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, weight } = req.body;

  // let coordinates;
  // try {
  //   coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }

  const createdProgram = new Program({
    title,
    description,
    weight,
    // location: coordinates,
    // image: req.file.path,
    creator: req.currentUser.userId
  });

  let user;
  try {
    user = await User.findById(req.currentUser.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating program failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProgram.save({ session: sess });
    user.programs.push(createdProgram);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating program failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ program: createdProgram });
};

const updateProgram = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description } = req.body;
  const programId = req.params.pid;

  let program;
  try {
    program = await Program.findById(programId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update program.',
      500
    );
    return next(error);
  }

  if (program.creator.toString() !== req.currentUser.userId) {
    const error = new HttpError('You are not allowed to edit this program.', 401);
    return next(error);
  }

  program.title = title;
  program.description = description;

  try {
    await program.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update program.',
      500
    );
    return next(error);
  }
  res.status(200).json({ program: program.toObject({ getters: true }) });
};

const deleteProgram = async (req, res, next) => {
  const programId = req.params.pid;

  let program;
  try {
    program = await Program.findById(programId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete program.',
      500
    );
    return next(error);
  }

  if (!program) {
    const error = new HttpError('Could not find program for this id.', 404);
    return next(error);
  }

  if (program.creator.id !== req.currentUser.userId) {
    const error = new HttpError(
      'You are not allowed to delete this program.',
      401
    );
    return next(error);
  }

  // const imagePath = program.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await program.remove({ session: sess });
    program.creator.programs.pull(program);
    await program.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete program.',
      500
    );
    return next(error);
  }

  // fs.unlink(imagePath, err => {
  //   console.log(err);
  // });

  res.status(200).json({ message: 'Deleted program.' });
};

exports.getProgramById = getProgramById;
exports.getProgramsByUserId = getProgramsByUserId;
exports.createProgram = createProgram;
exports.updateProgram = updateProgram;
exports.deleteProgram = deleteProgram;
