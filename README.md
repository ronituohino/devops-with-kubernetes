# DevOps with Kubernetes

This is a submission repository for the course
[DevOps with Kubernetes](https://devopswithkubernetes.com/)!

[DBaaS vs DIY comparison](./part3/3.06/dbaas-vs-diy.md)

## Local

To avoid having to push encoded secrets to the repository, I've manually set the secrets to the cluster once it has been set up.

Note that the actual value for the secret has to be encoded with `base64`.

### Setting up

The cluster

```
k3d cluster create
```

Argo

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Argo Rollouts

```
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

Prometheus
```
kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
```

### Ping Pong secrets

```
apiVersion: v1
kind: Secret
metadata:
  namespace: exercise
  name: pingpong-pg-password
data:
  PINGPONG_PG_PASSWORD: ...
```

### Project secrets

```
apiVersion: v1
kind: Secret
metadata:
  namespace: project
  name: todo-api-pg-password
data:
  TODO_API_PG_PASSWORD: ...
```

## GKE

### Starting up the cluster

```
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29
```

### Removing the cluster

```
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```

### Misc

To make automatic database backups work in GKE, a Service Account token with
write privileges to the Object Store must be manually assigned to the cluster as
a secret to the `default` namespace.

```
name: gcloud-token
data:
 - TOKEN: ...
```

