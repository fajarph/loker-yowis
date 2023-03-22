import React from "react";
import Navbar from "./Navbar";

const JobDetail = () => {

    return(
        <div>
            <Navbar/>
            <div className="job-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <div className="entry-content">
                                    <div className="card mt-5">
                                        <div className="card-body">
                                            <h2>Lowongan Kerja</h2>
                                            <div className="d-flex justify-content-between mt-2 ms-2 me-5">
                                                <h6>PT. KAMINDO SUKSES SELALU</h6>
                                                <h6>Jakarta Barat</h6>
                                                <h6>Grafis</h6>
                                                <h6>Negosiasi</h6>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h6>Level Pekerjaan : Junior / Entry Level</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Industri :</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Pendidikan : Diploma/D1/D2/D3, Sarjana / S1, SMA / SMK / STM</h6>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6>Tipe Pekerjaan : Purna Waktu / Full Time</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <h6>Posted Date: Maret 22, 2023</h6>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    {}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail