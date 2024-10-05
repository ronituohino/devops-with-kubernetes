# DBaaS vs DIY

Usage of a DBaaS ([Google Cloud SQL](https://cloud.google.com/sql)) compared to
rolling out our own database using Postgres images in the
[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/?hl=en).

## Required work

Initializing a Cloud SQL instance is very simple using the Google Cloud
interface. After this we would have to connect appropriate instances to the
database(s) using environment variables in our cluster, and we would be done.

In comparison, using our own Postgres image(s) requires us to set up the image
and configure networking within the cluster. However this offers a few
advantages. Firstly, we can scope databases to specific services which creates a
clearer architecture. Secondly, we have more control over the database
instances, because we are managing it ourselves. This helps avoid vendor lock-in
to some degree, because we are able to migrate the entire, or part of the
architecture to another platform .

## Costs

The monthly costs ($) of using a GKE instances are lower compared to Cloud SQL
instances. A single GKE instance running for a month in a single zone in the
region `europe-north1` with `4vCPUs`, `16GiB` of RAM, and with `6x375GB` local
SSDs is going to cost _$387.61_ (with sustained use discounts). A single managed
PostgreSQL instance in Cloud SQL with the same specifications goes for
_$614.36_. The managed instance pricing can be brought down quite a bit by
applying a "commited use discount" which means that the machine is leased under
a long-term contract, such as a year. The pricing estimations were done using
https://cloud.google.com/products/calculator.

## Maintenance

The obvious benefit of using Cloud SQL is that it is a managed service. This
means that the service offers maintenance functionality out-of-the-box such as
backups, database replications, data migrations, version upgrades, integrations
with other products, and robust dashboards to interact with, and manage the
instances.

In comparison, in GKE instances we have to implement such features ourselves if
they are needed.

Note that there could be some caveats with the features of a managed service. We
might not be able to implement some specific architectures if the service
doesn't support such features. If a specific feature is not supported, and it is
critical for the application, using GKE database instances is the way to go
because we have full control of the instances.

## Scaling

Both options offer _horizontal scaling_ by increasing the amount of vCPUs, RAM
or storage of an instance. However GKE would be more fit for implementing
_vertical scaling_ by automatically adding new/remove unnecessary database
instances to/from the cluster. This requires the application to be suitable for
such an architecture and intricate software design.

## Conclusion

In conclusion, we can say that for small-scale operations a managed service such
as Google Cloud SQL is a better option if the service supports all of our
required features, mainly because of the ease-of-use. For large-scale
operations, using a custom setup using database images within the cluster is
probably a better option because of the smaller overall costs, the ability to
create and define all of the needed features for the application, clearer
software architecture, and possible automatic vertical scaling features.
