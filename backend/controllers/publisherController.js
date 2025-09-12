import Publisher from "../models/publisherModel.js";

export const createPublisher = async (req, res) => {
  try {
    const { name, contactInfo } = req.body;
    const newPublisher = new Publisher({ name, contactInfo });
    await newPublisher.save();
    res.status(201).json(newPublisher);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) return res.status(404).json({ message: "Publisher not found" });
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updatePublisher = async (req, res) => {
  try {
    const updatedPublisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPublisher) return res.status(404).json({ message: "Publisher not found" });
    res.json(updatedPublisher);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deletePublisher = async (req, res) => {
  try {
    const deletedPublisher = await Publisher.findByIdAndDelete(req.params.id);
    if (!deletedPublisher) return res.status(404).json({ message: "Publisher not found" });
    res.json({ message: "Publisher deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
