const { Op } = require('sequelize');
const { Blog } = require('../models');
const moment = require('moment');

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.findAll();

        // Format tanggal ke dalam format Indonesia dengan hari
        const formattedBlogs = blogs.map(blog => {
            return {
                ...blog.toJSON(),
                tanggal_publikasi: moment(blog.tanggal_publikasi).locale('id-ID').format('dddd, DD MMMM YYYY'),
                createdAt: blog.createdAt ? moment(blog.createdAt).locale('id-ID').format('dddd, DD MMMM YYYY') : null,
                updatedAt: blog.updatedAt ? moment(blog.updatedAt).locale('id-ID').format('dddd, DD MMMM YYYY') : null,
            };
        });

        return res.status(200).json({ error: false, message: "Blog List successfully", blogs: formattedBlogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const blogDetailById = async (req, res) => {
    try {
        const blogId = req.params.id; // Ambil ID blog dari parameter URL

        const blog = await Blog.findByPk(blogId);

        if (!blog) {
            return res.status(404).json({ error: true, message: "Blog not found" });
        }

        // Format tanggal ke dalam format Indonesia dengan hari dalam bahasa Indonesia
        const formattedBlog = {
            ...blog.toJSON(),
            tanggal_publikasi: moment(blog.tanggal_publikasi).locale('id').format('dddd, DD MMMM YYYY'),
            createdAt: blog.createdAt ? moment(blog.createdAt).locale('id').format('dddd, DD MMMM YYYY') : null,
            updatedAt: blog.updatedAt ? moment(blog.updatedAt).locale('id').format('dddd, DD MMMM YYYY') : null,
        };

        return res.status(200).json({ error: false, message: "Blog detail successfully obtained", blog: formattedBlog });
    } catch (error) {
        console.error("Error retrieving blog detail:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const searchBlog = async (req, res) => {
    try {
        let searchQuery = req.query.q;

        if (!searchQuery) {
            return res.status(400).json({ error: true, message: "Query parameter 'q' is required for search" });
        }

        // Gunakan encodeURIComponent untuk mengganti spasi dan karakter khusus lainnya
        searchQuery = encodeURIComponent(searchQuery);

        const encodedQuery = searchQuery;

        const keywords = searchQuery.split('%20'); // Pisahkan kata kunci menjadi array
        const conditions = keywords.map(keyword => ({
            judul: {
                [Op.like]: `%${keyword}%`
            }
        }));

        const blogs = await Blog.findAll({
            where: {
                [Op.or]: conditions
            },
        });

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ error: true, message: "No blogs found" });
        }

        const formattedBlogs = blogs.map(blog => ({
            ...blog.toJSON(),
            tanggal_publikasi: moment(blog.tanggal_publikasi).locale('id-ID').format('dddd, DD MMMM YYYY'),
            createdAt: blog.createdAt ? moment(blog.createdAt).locale('id-ID').format('dddd, DD MMMM YYYY') : null,
            updatedAt: blog.updatedAt ? moment(blog.createdAt).locale('id-ID').format('dddd, DD MMMM YYYY') : null
        }));

        return res.status(200).json({ error: false, message: "Blogs successfully obtained", blogs: formattedBlogs, encodedQuery });
    } catch (error) {
        console.log("Error retrieving Blogs", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

module.exports = {
    getAllBlog,
    blogDetailById,
    searchBlog
};
