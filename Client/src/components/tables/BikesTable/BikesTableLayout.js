import React from 'react'


export const BikesTableLayout = ({ TableHeaders, TableBodyContent }) => {
    return (
        <div className="mt-4">
            {/* <h3 className="panel-title">
            <NavLink title="Add New Bike" id="addButton" className="text-info pull-right fa fa-plus link" to='/addBike' aria-hidden="true"></NavLink>
        </h3> */}
            <table id="BikesTable" className="table table-hover">
                <thead>
                    <tr>
                        <TableHeaders />
                    </tr>
                </thead>
                <tbody>
                    <TableBodyContent />
                </tbody>
            </table>
        </div>

    )
}

